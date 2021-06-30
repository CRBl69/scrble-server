import { serve } from 'https://deno.land/std@0.99.0/http/server.ts';
import { acceptWebSocket, WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std@0.99.0/ws/mod.ts';
import { readAll } from 'https://deno.land/std@0.99.0/io/util.ts'
import { Room } from './room.ts';

let td = new TextDecoder();

let rooms: Map<string, Room> = new Map();

for await (const req of serve({port:6942})){
    const h = new Headers({'Access-Control-Allow-Origin': 'http://bite.ddns.net'});
    console.log(req.url);
    switch(req.url) {
        case '/ws':
            const { conn, r: bufReader, w: bufWriter, headers } = req;
            acceptWebSocket({
                conn,
                bufReader,
                bufWriter,
                headers,
            }).then(handleWs);
            break;
        case '/rooms':
            let msg: string[] = [];
            rooms.forEach(room => msg.push(room.name));
            req.respond({status: 200, body: JSON.stringify(msg), headers: h});
            break;
        case '/new-room':
            let roomId = generateRoomId();
            rooms.set(roomId, new Room(roomId));
            req.respond({status: 200, body: roomId, headers: h});
            break;
    }
}

async function handleWs(socket: WebSocket) {
    for await (const event of socket) {
        if(typeof event == "string") {
            console.log(event);
            try {
                let msg: WsMessage = JSON.parse(event);
                rooms.get(msg.room)?.handleMessage(msg, socket);
            } catch(e) {
                console.log(`${event} ${e}`);
            }
        } else if(isWebSocketCloseEvent(event)) {
            for(let room of rooms) {
                for(let player of room[1].players) {
                    if(socket == player.socket && !room[1].started) {
                        room[1].players = room[1].players.filter(p => p != player);
                        if(room[1].players.length == 0) rooms.delete(room[0]);
                    }
                }
            }
        }
    }
}

interface WsMessage {
    type: string,
    room: string,
    data: any
}

function generateRoomId(): string {
    let id = "xxxxxxxxxxxxxxx".replace(/x/g, () => (((1+Math.random())*0x10000)|0).toString(16).substring(1));
    if(rooms.get(id) != undefined) return generateRoomId();
    return id;
}
