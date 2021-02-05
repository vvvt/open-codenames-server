export default class GameData {
    static getGameData() {
        let set = [[], [], [], [], []];
        let start = Math.floor(Math.random() + 0.5) ? 1 : 2;
        let words = [...WORDS];

        let factions = [
            ...new Array(7).fill(0),
            ...new Array(9 - start).fill(1),
            ...new Array(8 + start).fill(2),
            ...new Array(1).fill(3),
        ];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const id = factions.splice(
                    Math.floor(Math.random() * factions.length),
                    1
                )[0];
                const word = words.splice(
                    Math.floor(Math.random() * words.length),
                    1
                )[0];
                set[i][j] = {
                    color: this.fromID(id).color,
                    word,
                    turned: false
                };
            }
        }
        return set;
    }
}