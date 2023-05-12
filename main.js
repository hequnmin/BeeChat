const electron = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');
const { app, BrowserWindow, ipcMain, dialog } = electron;

var dgram = require("dgram");
var client = dgram.createSocket("udp4");
// var ip = require("ip");

// const server_ip = "10.15.5.151"; //Sever IP and port will prob be obtained from calling arguments or something, hardcoded atm
const server_ip = "10.15.46.125";
const server_port = 65432
let client_name;
let peersList = [];
let image = '';
const appPath = app.getAppPath();
if (process.env.NODE_ENV === 'development') {
  // Reload the window on file changes when in development mode
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit',
  });
}
function createWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Blueway ATE 2022',
    width: 1024,
    height: 768,

    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, '/backend/client.js'),
      // preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,    //上下文隔离，此参数影响net的使用
      enableremotemodule: true,
    }

  });
  // mainWindow.menuBarVisible = false;
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
  }))
  client.on("message", (msg, rinfo) => {
    msg = JSON.parse(msg);

    if (msg.hasOwnProperty("type")) {
      switch (msg.type) {
        case "login"://登录成功
          //{"result":{"sign":"138e222aac1cb49ba0c771ac646de063"},"error":{"code":0,"info":""}}
          mainWindow.webContents.send('register_user', "OK")
          break;
        case "find"://搜索到对方
          //{"result":[{"userno":"name2","address":"10.15.14.128","port":62004,"lastlogin":"2023-05-04T03:38:24.000Z","mac":"2c:03:c0:72:83:c4"}],"error":{"code":0,"info":""}}
          if (msg.result[0]) {
            let src_ip = msg.result[0].address;
            let src_port = msg.result[0].port;
            peersList.push(msg.result[0].userno);
            let ackMessage_finduser = JSON.stringify({
              username: msg.result[0].userno,
              userid: peersList.length,
              address: msg.result[0].address,
              port: msg.result[0].port
            });
            let ackMessage_client = JSON.stringify({
              type: "holepunch_ack",
              client_name: client_name
            });
            client.send(ackMessage_client, src_port, src_ip);

            mainWindow.webContents.send('find_user', ackMessage_finduser)
          }
          break;
        case "holepunch_ack"://收到打洞请求回应
          console.log(`Received holepunch ACK from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
          let ackMessage_ok = JSON.stringify({
            type: "holepunch_success",
            result: {
              userno: msg.client_name,
            },
            error: {
              code: 0,
              info: ""
            }
          });
          client.send(ackMessage_ok, rinfo.port, rinfo.address);
          break;
        case "holepunch_success"://收到打洞请求回应
          console.log(`Received holepunch success from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
          break;
        case "chat_message":
          var error = { code: 0, info: '' };
          var response = { type: "rechat_message", result: "ok", error: error };
          client.send(JSON.stringify(response), rinfo.port, rinfo.address);
          if (msg.content.type === "file") {
          } else if (msg.content.type === "image") {            
            image += msg.content.data
            console.log("Accept Dowload:Size:", image.length)
            if (image.length>=msg.length) {
              console.log("finished Dowload:Size:", image.length)
              let buff = Buffer.from(image, 'base64');
              let downPath = path.join(appPath, '/downloads');
              if (!fs.existsSync(downPath)) {
                fs.mkdirSync(downPath, { recursive: true });
              }
              fs.writeFileSync(path.join(downPath, msg.content.image_name), buff);
              msg.content.path = path.join(downPath, msg.content.image_name);
              mainWindow.webContents.send('receive_message', msg);
              image = '';
            }
          } else {
            mainWindow.webContents.send('receive_message', msg)

          }
          break;
        case "rechat_message":
          mainWindow.webContents.send('send_message_ok')
          break;
        default:
          break;
      }
    }
    else {
      let msg_error = JSON.stringify({
        type: "error",
        error: {
          code: 1,
          info: "参数错误"
        }
      })
      client.send(msg_error, rinfo.port, rinfo.address)
    }

  });
  ipcMain.on('REGISTER_USER', (event, message) => {
    client_name = message.name;
    console.log(`${client_name}, you are about to register yourself with the Server...`);
    let msg = JSON.stringify({
      type: "login",
      data: {
        mac: "2c:03:c0:72:83:c4",
        userno: client_name,
        address: "127.0.0.1",
        port: 4000
      }
    });
    client.send(msg, server_port, server_ip);
  })
  ipcMain.on('SEND_MESSAGE', (event, message) => {
    console.log(message);
    let msg = {
      type: "chat_message",
      userno: message.userno,
      length: 0,
      content: message.content
    };
    if (message.content.type === "file") {
      msg.content.data = "";
      let fileInfo = fs.statSync(message.content.data);
      let fileSize = fileInfo.size;
      let sendSize = 0;
      let packSize = 1024;
      let fd = fs.openSync(message.content.data, 'r');
      let buf = new Buffer.alloc(packSize);
      while (sendSize < fileSize) {
        //readSync参数:文件ID,buffer对象,写入buffer的起始位置,写入buffer的结束位置,读取文件的起始位置
        fs.readSync(fd, buf, 0, buf.length, sendSize);
        let data = buf.toString('hex');//以十六进制传输
        // client.send(data, port, address);
        msg.content.data += data;
        sendSize += packSize;
      }
    } else if (message.content.type === "image") {
      fs.readFile(message.content.path, (e, data) => {
        const string = data.toString("base64")
        msg.length = string.length;
        for (let i = 0; i < string.length; i += 60000) {
          setTimeout(() => {
            msg.content.data = string.slice(i, i + 60000).trim();
            client.send(JSON.stringify(msg), message.peer.port, message.peer.address);
          }, (i / 60000) * 100)
        }
      });
    }
    else {
      client.send(JSON.stringify(msg), message.peer.port, message.peer.address);
    }
    // client.send(JSON.stringify(msg), message.peer.port, message.peer.address);
  })

  ipcMain.on('FIND_USER', (event, data) => {
    let msg = JSON.stringify({
      token: {
        sign: "138e222aac1cb49ba0c771ac646de063",
      },
      type: "find",
      data: {
        entity: "login",
        prop: {
          userno: data.findPeer
        }
      }
    });
    client.send(msg, server_port, server_ip);
  })

  ipcMain.on('open_dialog', () => {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'TXT', extensions: ['txt'] },        
        { name: 'All Files', extensions: ['*'] }
      ]
    }).then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedFile = {fullpath:result.filePaths[0],info:path.parse(result.filePaths[0])};
        // {
        //   root: '/',
        //   dir: '/user/thinkpad/desktop/weburl',
        //   base: 'url.jpg,
        //   ext: '.jpg',
        //   name: 'url'
        // }      
        mainWindow.webContents.send('selectedFile', selectedFile);
      }
    });
  })
}

app.whenReady().then(createWindow);
