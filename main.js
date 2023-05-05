const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow,ipcMain } = electron;

var dgram = require("dgram");
var client = dgram.createSocket("udp4");
var ip = require("ip");

const server_ip = "10.15.5.151"; //Sever IP and port will prob be obtained from calling arguments or something, hardcoded atm
const server_port = 65432
let client_name;
let peersList = [];
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
      contextIsolation: false     //上下文隔离，此参数影响net的使用
      
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
  
    if (msg.hasOwnProperty("msg_type")) {
      switch (msg.msg_type) {
        case "holepunch_syn"://发送打洞请求
          console.log(`Received holepunch SYN from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
          break;
        case "holepunch_ack"://收到打洞请求回应
          console.log(`Received holepunch ACK from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
          let ackMessage_ok = JSON.stringify({
            msg_type: "holepunch_success",
            client_name: msg.client_name,
          });
          client.send(ackMessage_ok, rinfo.port, rinfo.address);
          break;
        case "holepunch_success"://收到打洞请求回应
        console.log(`Received holepunch success from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);

          break;
        case "chat_message":
          console.log(`${msg.author}: ${msg.message}`);
          console.log(msg);
          mainWindow.webContents.send('receive_message', msg)
          break;
        default:
          break;
      }
    }
    else {
      const result = msg.result;
      if (result.length !== 0) {
        if (Array.isArray(result)) {//搜索到对方
          //{"result":[{"userno":"name2","address":"10.15.14.128","port":62004,"lastlogin":"2023-05-04T03:38:24.000Z","mac":"2c:03:c0:72:83:c4"}],"error":{"code":0,"info":""}}
          if (result[0].hasOwnProperty("userno")) {
            let src_ip = msg.result[0].address;
            let src_port = msg.result[0].port;
            peersList.push(result[0].userno);
            let ackMessage_finduser = JSON.stringify({
              username: result[0].userno,
              userid: peersList.length,
              address: result[0].address,
              port: result[0].port
            });
            let ackMessage_client = JSON.stringify({
              msg_type: "holepunch_ack",
              client_name: client_name
            });
            client.send(ackMessage_client, src_port, src_ip);

            mainWindow.webContents.send('find_user', ackMessage_finduser)
          } else {
          }
        }
        else { //登录成功
          //{"result":{"sign":"138e222aac1cb49ba0c771ac646de063"},"error":{"code":0,"info":""}}
          mainWindow.webContents.send('register_user', "OK")
        }
      }
    }
    
  });
  ipcMain.on('REGISTER_USER', (event,message) => {
    client_name = message.name;
		console.log(`${client_name}, you are about to register yourself with the Server...`);
		let msg = JSON.stringify({
			doing: "login",
			data: {
				mac: "2c:03:c0:72:83:c4",
				userno: client_name,
				address: ip.address(),
				port: 4000
			}
		});
		client.send(msg, server_port, server_ip);
  })
  ipcMain.on('SEND_MESSAGE', (event,data) => {
    console.log(data);
		let msg = JSON.stringify({
			msg_type: "chat_message",
			author: data.author,
			message: data.message
		});
		client.send(msg, data.peer.port, data.peer.address);
  })
  ipcMain.on('FIND_USER', (event,data) => {
    let msg = JSON.stringify({
			token: {
				sign: "138e222aac1cb49ba0c771ac646de063",
			},
			doing: "find",
			data: {
				entity: "login",
				prop: {
					userno: data.findPeer
				}
			}
		});
		client.send(msg, server_port, server_ip);
  })
}

app.whenReady().then(createWindow);
