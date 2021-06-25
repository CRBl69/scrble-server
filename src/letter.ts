let values: Map<string, number> = new Map();

values.set("a", 1);
values.set("b", 3);
values.set("c", 3);
values.set("d", 2);
values.set("e", 1);
values.set("f", 4);
values.set("g", 2);
values.set("h", 4);
values.set("i", 1);
values.set("j", 8);
values.set("k", 10);
values.set("l", 1);
values.set("m", 2);
values.set("n", 1);
values.set("o", 1);
values.set("p", 3);
values.set("q", 8);
values.set("r", 1);
values.set("s", 1);
values.set("t", 1);
values.set("u", 1);
values.set("v", 4);
values.set("w", 10);
values.set("x", 10);
values.set("y", 10);
values.set("z", 10);
values.set("*", 0);

export class Letter {
    private letter: string;
    private amount: number;

    constructor(letter: string) {
        this.letter = letter;
        this.amount = values.get(letter) ?? 0;
    }

    getAmount() {
        return this.amount;
    }

    getLetter() {
        return this.letter;
    }
}