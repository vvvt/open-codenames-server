export default class Factions {
    static fromID(id) {
        return FACTIONS.find(faction => faction.id === id);
    }

    static getGameSet() {
        let set = [[], [], [], [], []];
        let start = Math.floor(Math.random() + 0.5) ? 1 : 2;
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
                )[0]
                set[i][j] = this.fromID(id).color;
            }
        }
        return set;
    }
}

const FACTIONS = Object.freeze([
    {
        id: 0,
        name: 'Neutral',
        color: '#cec69d',
    },
    {
        id: 1,
        name: 'Blau',
        color: '#6cbbff',
    },
    {
        id: 2,
        name: 'Rot',
        color: '#ff736c',
    },
    {
        id: 3,
        name: 'Assassin',
        color: '#2d2d2d',
    },
]);
