import { serve } from 'https://deno.land/std@0.99.0/http/server.ts';
import { acceptWebSocket, WebSocket } from 'https://deno.land/std@0.99.0/ws/mod.ts';
import { readAll } from 'https://deno.land/std@0.99.0/io/util.ts'
import { Room } from './room.ts';

let td = new TextDecoder();

let rooms: Room[] = [];

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
            let reqBody = td.decode(await readAll(req.body));
            let roomExists = false;
            rooms.forEach(room => {
                if(room.name == reqBody) {
                    roomExists = true;
                }
            });
            if(!roomExists) {
                rooms.push(new Room(reqBody));
                req.respond({status: 200, body: 'created', headers: h});
            } else {
                req.respond({status: 200, body: 'error', headers: h});
            }
            break;
    }
}

async function handleWs(socket: WebSocket) {
    for await (const event of socket) {
        if(typeof event == "string") {
            console.log(event);
            try {
                let msg: WsMessage = JSON.parse(event);
                rooms.forEach(room => {
                    if(room.name == msg.room) {
                        room.handleMessage(msg, socket);
                    }
                });
            } catch(e) {
                console.log(`Could not convert string to WsMessage: ${e}`);
            }
        }
    }
}

interface WsMessage {
    type: string,
    room: string,
    data: any
}
