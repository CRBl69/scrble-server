import { WebSocket } from 'https://deno.land/std@0.99.0/ws/mod.ts';
import { Case } from './case.ts';
import { Letter } from './letter.ts';

export class Room {
    name: string;
    players: Player[] = [];
    currentPlayer: Player | null = null;
    map = [
        [
            new Case("tripleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleWord"),
        ],
        [
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case('tripleWord'),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("starting"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case('tripleWord'),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
        ],
        [
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
        ],
        [
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleWord"),
            new Case("normal"),
        ],
        [
            new Case("tripleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleWord"),
            new Case("normal"),
            new Case("normal"),
            new Case("normal"),
            new Case("doubleLetter"),
            new Case("normal"),
            new Case("normal"),
            new Case("tripleWord"),
        ],
    ];
    letters = [
        "a", "a", "a", "a", "a", "a", "a", "a", "a",
        "b", "b",
        "c", "c",
        "d", "d", "d",
        "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
        "f", "f",
        "g", "g",
        "h", "h",
        "i", "i", "i", "i", "i", "i", "i", "i",
        "j",
        "k",
        "l", "l", "l", "l", "l",
        "m", "m", "m",
        "n", "n", "n", "n", "n", "n",
        "o", "o", "o", "o", "o", "o",
        "p", "p",
        "q",
        "r", "r", "r", "r", "r", "r",
        "s", "s", "s", "s", "s", "s",
        "t", "t", "t", "t", "t", "t",
        "u", "u", "u", "u", "u", "u",
        "v", "v",
        "w",
        "x",
        "y",
        "z",
        "*", "*"
    ];
    started = false;
    casesPut: { c: Case, x: number, y: number }[] = [];

    constructor(name: string) {
        this.name = name;

    }

    handleMessage(msg: WsMessage, socket: WebSocket) {
        switch (msg.type) {
            case 'join':
                this.join(msg.data.playerName, socket);
                this.broadcast();
                break;
            case 'start':
                this.start();
                break;
            case 'caseClicked':
                if (this.currentPlayer?.socket == socket) this.caseClicked(msg.data);
                this.broadcast();
                break;
            case 'done':
                if (this.currentPlayer?.socket == socket) this.done();
                this.broadcast();
                break;
            case 'swap':
                if (this.currentPlayer?.socket == socket) this.swap(msg.data);
                this.broadcast();
                break;
            case 'reset':
                if (this.currentPlayer?.socket == socket) this.reset();
                this.broadcast();
                break;
            case 'quit':
                this.quit(socket);
        }
    }

    start() {
        this.started = true;
        this.next();
        this.players.forEach(player => {
            for (let i = 0; i < 7; i++) {
                if(this.letters.length > 0) {
                    player.letters.push(this.getLetter());
                }
            }
            player.socket.send(JSON.stringify({
                type: 'start',
                data: player.letters
            }))
        })
    }

    next() {
        if (this.currentPlayer != null) {
            let nextPlayer = this.players.indexOf(this.currentPlayer) + 1;
            if (nextPlayer == this.players.length) nextPlayer = 0;
            this.currentPlayer = this.players[nextPlayer];
        } else if (this.players.length > 0) {
            this.currentPlayer = this.players[0];
        }
        this.broadcast();
        this.currentPlayer!.socket.send(JSON.stringify({ type: 'turn', data: null }))
    }

    broadcast() {
        let scores: { name: string, score: number }[] = [];
        for (let player of this.players) {
            scores.push({ name: player.name, score: player.points });
        }
        let msg: WsMessage = {
            type: 'update',
            data: {
                map: this.map,
                scores,
                letters: undefined,
                left: this.letters.length,
                started: this.started,
                actualPlayer: this.currentPlayer?.name
            }
        }
        this.players.forEach(player => {
            msg.data.letters = player.letters;
            player.socket.send(JSON.stringify(msg));
        })
    }

    join(name: string, socket: WebSocket) {
        let player = this.players.find(player => player.name == name);
        if (!this.started && player === undefined) {
            this.players.push({
                name,
                letters: [],
                points: 0,
                socket,
                swapLeft: 7
            });
        } else if (player !== undefined && player.socket.isClosed) {
            player!.socket = socket;
            // To determine if needed
            // if (this.currentPlayer == player) {
            //     this.currentPlayer.socket.send(JSON.stringify({ type: 'turn', data: null }));
            // }
        }
    }

    caseClicked(data: { letterIndex: number, x: number, y: number }) {
        let { letterIndex, x, y } = data;
        if(x > 0 && y > 0 && x < this.map.length && y < this.map.length && letterIndex > 0 && letterIndex < this.currentPlayer!.letters.length) {
            if (this.map[x][y].getLetter() == null && this.currentPlayer!.swapLeft == 7 && this.checkAdjacent(x, y)) {
                this.casesPut.push({ c: this.map[x][y], x, y });
                this.map[x][y].setLetter(this.currentPlayer!.letters[letterIndex]);
                let letter = this.currentPlayer!.letters[letterIndex];
                this.currentPlayer!.letters = this.currentPlayer!.letters.filter(v => v != letter);
            }
        }
    }

    checkAdjacent(x: number, y: number): boolean {
        if (x - 1 > 0 && this.map[x - 1][y].getLetter() != null) return true;
        if (y - 1 > 0 && this.map[x][y - 1].getLetter() != null) return true;
        if (x + 1 < this.map.length && this.map[x + 1][y].getLetter() != null) return true;
        if (y + 1 < this.map.length && this.map[x][y + 1].getLetter() != null) return true;
        if (x == 7 && y == 7) return true;
        return false;
    }

    done() {
        if (this.currentPlayer?.swapLeft == 7) {
            this.currentPlayer.points += this.calculatePoints();
            while (this.currentPlayer.letters.length < 7) {
                if(this.letters.length > 0) {
                    this.currentPlayer.letters.push(this.getLetter());
                }
            }
        } else {
            this.currentPlayer!.swapLeft = 7;
        }
        this.casesPut = [];
        if(this.letters.length == 0) {
            let playersHaveLetters = false;
            for(let player of this.players) {
                if(player.letters.length > 0) {
                    playersHaveLetters = true;
                    break;
                }
            }
            if(playersHaveLetters == false) {
                this.players.forEach(player => player.socket.send(JSON.stringify({type: 'end', data: null})))
            }
        }
        this.next();
    }

    calculatePoints(): number {
        let words: string[] = [];
        let scoreBuffer = 0;
        for (let c of this.casesPut) {
            let word = this.getWords(c);
            for (let w of word) {
                if (w.word != "" && !words.includes(w.word)) {
                    words.push(w.word);
                    scoreBuffer += w.value;
                }
            }
        }
        for (let c of this.casesPut) {
            c.c.takeBonus();
        }
        return scoreBuffer;
    }

    getWords(c: { c: Case, x: number, y: number }): { value: number, word: string }[] {
        return [this.getWordH(c), this.getWordV(c)];
    }
    getWordV(c: { c: Case, x: number, y: number }): { value: number, word: string } {
        if ((c.x - 1 >= 0 && this.map[c.x - 1][c.y].getLetter() != null) || (c.x + 1 < this.map.length && this.map[c.x + 1][c.y].getLetter() != null)) {
            let total = 0;
            let word = "";
            let i = 0;
            while (c.x - i >= 0 && this.map[c.x - i][c.y].getLetter() != null) {
                i++;
            }
            let begin = c.x - i + 1;
            i = 0
            while (begin + i < this.map.length && this.map[begin + i][c.y].getLetter() != null) {
                i++;
            }
            let end = begin + i;
            let multuplier = 1;
            for (let i = begin; i < end; i++) {
                let caseM = this.map[i][c.y].getMultiplier();
                console.log(this.map[i][c.y]);
                multuplier = Math.max(caseM, multuplier);
                total += this.map[i][c.y].getLetterScore();
                word += this.map[i][c.y].getLetter()?.getLetter();
            }
            return { value: total * multuplier, word };
        } else {
            return { value: 0, word: "" };
        }
    }
    getWordH(c: { c: Case, x: number, y: number }): { value: number, word: string } {
        if ((c.y - 1 >= 0 && this.map[c.x][c.y - 1].getLetter() != null) || (c.y + 1 < this.map.length && this.map[c.x][c.y + 1].getLetter() != null)) {
            let total = 0;
            let word = "";
            let i = 0;
            while (c.y - i >= 0 && this.map[c.x][c.y - i].getLetter() != null) {
                i++;
            }
            let begin = c.y - i + 1;
            i = 0
            while (begin + i < this.map.length && this.map[c.x][begin + i].getLetter() != null) {
                i++;
            }
            let end = begin + i;
            let multuplier = 1;
            for (let i = begin; i < end; i++) {
                if (this.map[c.x][i].getType() == "tripleWord") multuplier = 3;
                else if (this.map[c.x][i].getType() == "doubleWord") multuplier = 2;
                total += this.map[c.x][i].getLetterScore();
                word += this.map[c.x][i].getLetter()?.getLetter();
            }
            return { value: total * multuplier, word };
        } else {
            return { value: 0, word: "" };
        }
    }

    reset() {
        for (let c of this.casesPut) {
            this.currentPlayer?.letters.push(c.c.getLetter()!);
            this.map[c.x][c.y].removeLetter();
        }
        this.casesPut = [];
    }

    swap(letterIndex: number) {
        if(this.currentPlayer!.swapLeft > 0 && this.letters.length > 0 && letterIndex > 0 && letterIndex < this.currentPlayer!.letters.length){
            let letter = this.currentPlayer!.letters[letterIndex];
            this.currentPlayer!.letters = this.currentPlayer!.letters.filter(l => l != letter);
            this.letters.push(letter.getLetter());
            this.currentPlayer!.letters.push(this.getLetter());
            this.currentPlayer!.swapLeft--;
        }
    }

    getLetter(): Letter {
        let rand = Math.floor(Math.random() * this.letters.length);
        let letter = this.letters[rand];
        this.letters = [...this.letters.slice(0, rand), ...this.letters.slice(rand + 1)];
        return new Letter(letter);
    }

    quit(socket: WebSocket) {
        let player = this.players.find(p => p.socket == socket);
        if(player) {
            player.letters.forEach(l => this.letters.push(l.getLetter()));
            this.players = this.players.filter(p => p.socket != socket);
        }
    }
}

interface Player {
    name: string,
    socket: WebSocket,
    points: number,
    letters: Letter[],
    swapLeft: number
}

interface WsMessage {
    type: string,
    data: any
}
