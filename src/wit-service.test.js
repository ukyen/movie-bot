const WitService = require('./wit-service');
require('dotenv').config();
require("jest-playback").setup(__dirname);

const wit = new WitService(process.env.WIT_API_KEY)


describe("WitService.query", () => {

    test("trained message", async () => {
        const question = "What's the 1st ranked movie?"
        const result = await wit.query(question);
        expect(result.text).toBe(question);
        expect(result.intents[0].name).toEqual("movie_rank");
        expect(result.entities[0].name).toEqual("rank");
        expect(result.entities[0].value).toEqual("1st");
    });

    test("untrained message", async () => {
        const question = "How are you?"
        const result = await wit.query(question);
        expect(result.text).toBe(question);
        expect(result.intents).toEqual([]);
        expect(result.entities).toEqual([]);
    });
});
