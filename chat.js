const ws = require('nodejs-websocket')
const {
    Chat
} = require('./app/modules/chat')

let onlineList = []
//信息类型
const msgType = {
    onlineInfo: 0, //关于在线列表
    chatInfo: 1 //关于聊天内容
}

//对象数组去重
function unique(arr) {
    const obj = {}
    const result = arr.reduce((total, cur) => {
        if (!obj[cur.id]) {
            obj[cur.id] = total.push(cur)
        }
        return total
    }, [])
    return result
}

const server = ws.createServer(function (connection) {

    connection.user = {}

    connection.on('text', function (str) {
        const info = JSON.parse(str)
        console.log(info);
        if (!connection.user.id) {
            connection.user = info
            //防止同一个账号在同一个浏览器中的不同窗口重复上线
            const isExist = onlineList.find(item => item.id === connection.user.id)
            onlineList.push(info)
            const data = {
                onlineList: unique(onlineList),
                text: isExist ? '' : `用户${connection.user.username}已上线`
            }
            broadcast(data, msgType.onlineInfo)
        } else {
            //当用户修改头像或昵称时，修改connection.user,onlineList不用修改，因为userid不会变
            if (info.id) {
                connection.user = info
                return
            }
            const data = {
                userId: connection.user.id,
                username: connection.user.username,
                createTime: Date.now(),
                content: info.content
            }
            Chat.addChat(data)
            broadcast(data)
        }
        // if (!connection.user.id) {
        //     connection.user = info
        //     onlineList.push(info)
        //     const data = {
        //         onlineList,
        //         text: `用户${connection.user.username}已上线`
        //     }
        //     broadcast(data, msgType.onlineInfo)
        // } else {
        //     if (info.id) {
        //         connection.user = info
        //         return
        //     }
        //     const data = {
        //         userId: connection.user.id,
        //         username: connection.user.username,
        //         userAvatar: connection.user.avatar,
        //         createTime: Date.now(),
        //         content: info.content
        //     }
        //     addChat(data)
        //     broadcast(data)
        // }
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


function broadcast(msg, type = msgType.chatInfo) {
    server.connections.forEach(function (connection) {
        connection.sendText(JSON.stringify({
            type,
            msg
        }))
    })
}

server.listen(7778);