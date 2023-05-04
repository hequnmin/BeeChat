var express = require('express');
var app = express();

var dgram = require("dgram");
var ip = require("ip");

const server_ip = "10.15.5.151"; //Sever IP and port will prob be obtained from calling arguments or something, hardcoded atm
const server_port = 65432

// var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");

let client_name;
let peersList = [];
// 设置允许跨域请求的域名列表
const allowedOrigins = ['http://localhost:3000'];

// 设置 CORS 头
app.use((req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//启动服务器，监听连接请求
server.listen(8080, () => {
	console.log('Server started on port 8080');
});

io.on('connection', (socket) => {
	console.log('Socket connected:', socket.id);

	socket.on("REGISTER_USER", function (data) {
		client_name = data.name;
		const clientAddress = client.address();		
		console.log(`${client_name}, you are about to register yourself with the Server...`);
		let msg = JSON.stringify({
			doing: "login",
			data: {
				mac: "2c:03:c0:72:83:c4",
				userno: client_name,
				address: ip.address(),
				port: clientAddress.port
			}
		});
		client.send(msg, server_port, server_ip);
	});
	socket.on("SEND_MESSAGE", function (data) {
		console.log(data);
		let msg = JSON.stringify({
			msg_type: "chat_message",
			author: data.author,
			message: data.message
		});
		client.send(msg, data.peer.port, data.peer.address);
	});
	socket.on("FIND_USER", function (data) {
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
	});
	socket.on("HOLE_PUNCH", function (data) {
		let msg = JSON.stringify({
			msg_type: "holepunch_syn",
			author: data.author,
			message: data.message
		});
		client.send(msg, data.peer.address, data.peer.port);
	});
});

client.on("message", (msg, rinfo) => {
	msg = JSON.parse(msg);

	if (msg.hasOwnProperty("msg_type")) {
		switch (msg.msg_type) {
			case "holepunch_syn"://发送打洞请求
				console.log(`Received holepunch SYN from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
				// sendACK(msg, rinfo);
				break;
			case "holepunch_ack"://收到打洞请求回应
				console.log(`Received holepunch ACK from ${msg.client_name} (${rinfo.address}:${rinfo.port})`);
				client.send("holepunch_success", rinfo.port, rinfo.address);
				// io.emit("PUNCH_SUCCESS", "");
				break;
			case "holepunch_success"://收到打洞请求回应
				io.emit("PUNCH_SUCCESS", "Success");
				break;
			case "chat_message":
				console.log(`${msg.author}: ${msg.message}`);
				console.log(msg);
				io.emit("RECEIVE_MESSAGE", msg);
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
					let ackMessage_io = JSON.stringify({
						username: result[0].userno,
						userid: peersList.length,
						address: result[0].address,
						port: result[0].port
					});
					io.emit("NEW_USER", ackMessage_io);
	
					let ackMessage_client = JSON.stringify({
						msg_type: "holepunch_ack",
						client_name: msg.result[0].userno
					});
					client.send(ackMessage_client, src_port, src_ip);
				} else {
				}
			}
			else { //登录成功
				//{"result":{"sign":"138e222aac1cb49ba0c771ac646de063"},"error":{"code":0,"info":""}}
				io.emit("LOGIN_USER", "true");
			}
		}
	}
});

client.bind(4000)