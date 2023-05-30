# BeeChat

## 一、主进程与渲染进程通信

peer
| Syntax   | Description     |
| -------- | --------------- |
| userid   | "" |
| userno   |                 |
| address  |                 |
| port     |                 |
| lastlogin|                 |
| mac      |                 |

### 1. 登录

* 发送

```javascript
("REGISTER_USER",{
    userName:"name1"
})
```

* 回

```javascript
("register_user"，"OK")
```

### 2. 查找

发

```javascript
("FIND_USER",
{
    id:1,
    author:"name1",
    findpeer:"name2"
})
```

回

```javascript
("find_user",
{
    result:"",
    user:{
        userno:"name1",
        userid:1,
        address:"127.0.0.1",
        port:1234,
        lastlogin:'',
        mac:''
    }
})
```

### 3. 发送信息

发

```javascript
("SEND_MESSAGE",
{
    userno:"name1",
    time:''
    content:{
        type:"image"
        path:""
        image_name:""
        data:""
    },
    peer:{

    }
})
```

## 二、客户端与服务器

### 1.登录

发送

```json
{
    "type":"login",
    "data":
    {
        "mac":"2c:03:c0:72:83:c4",
        "userno":"name2",
        "address":"192.168.1.114",
        "port":3000
    }}
```

回复(带有令牌字段)

```json
{
    "result":
    {
        "sign":"138e222aac1cb49ba0c771ac646de063"
    },
    "error":
    {
        "code":0,
        "info":""
        }}
```

### 2.查找

发送

```json
{
    "token":
    {
        "sign":"138e222aac1cb49ba0c771ac646de063"
    },
    "type":"find",
    "data":
    {
        "entity":"login",
        "prop":
        {
            "userno":"name2"
        }}}
```

回复

```json
{
    "result":
    [{
        "userno":"name2",
        "address":"10.15.46.125",
        "port":62111,
        "lastlogin":"2023-05-08T06:17:12.000Z",
        "mac":"2c:03:c0:72:83:c4"
    }],
    "error":
    {
        "code":0,
        "info":""
    }
}
```

### 3.在线心跳✨


## 三、客户端与客户端

### 1.打洞

发送📨

| Syntax   | Description     |
| -------- | --------------- |
| type     | "holepunch_ack" |
| userno   |                 |

回📡

| Syntax   | Description         |
| -------- | ------------------- |
| type     | "holepunch_success" |
| result   |                     |
| error|code|
|          |  info               |

### 2.发送信息✨

发
|Syntax     | Syntax2  | value |
| --------- | --------- | --------- |
|type| | "chat_message"|
|userno|              | |
|length|              | |
|content|type|"text","file","image"|
| |data|

当发送的内容类型是图片时image🖼️：

```javascript
content:
    {
        type:"image",
        path: file.fullname, 
        image_name: file.info.name, 
        data: ""
    }
```

回：
|Syntax     | Syntax2  | value |
| --------- | --------- | --------- |
|type| |"rechat_message"|
|result|
|error|code|
| |info|
