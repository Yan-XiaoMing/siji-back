 const ws = require('nodejs-websocket')

 const server = ws.createServer(function(connection){

    connection.user = {}

    connection.server = null;

    connection.on('text',function(str){
        const info = JSON.parse(str)
        if (!connection.user.id) {
            connection.user = info
            onlineList.push(info)
            const data = {
                onlineList,
                text: `用户${connection.user.username}已上线`
            }
            broadcast(data, msgType.onlineInfo)
        } else {
            if (info.id) {
                connection.user = info
                return
            }
            const data = {
                userId: connection.user.id,
                username: connection.user.username,
                userAvatar: connection.user.avatar,
                createTime: Date.now(),
                content: info.content
            }
            addChat(data)
            broadcast(data)
        }
    })

    connection.on('close', function (code, reason) {
        onlineList = onlineList.filter(item => item.id !== connection.user.id)
        const data = {
            onlineList,
            text: `用户${connection.user.username}已下线`
        }
        broadcast(data, msgType.onlineInfo)
    })

    connection.on('error', function (error) {
        console.log(error)
    })
 })


 function broadcast(msg,type=msgType.chatInfo) {
     server.connections.forEach(function (connection) {
         connection.sendText(JSON.stringify({
             type,
             msg
         }))
     })
 }

 server.listen(8081);