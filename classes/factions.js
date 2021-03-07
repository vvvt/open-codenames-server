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
                set[i][j] = this.fromID(id).name;
            }
        }
        return set;
    }
}

const FACTIONS = Object.freeze([
    {
        id: 0,
        name: 'neutral',
    },
    {
        id: 1,
        name: 'blue',
    },
    {
        id: 2,
        name: 'red',
    },
    {
        id: 3,
        name: 'assassin',
    },
]);
