const movie = require('../movie-functions');
const path = require("path");
var mysql = require('mysql2');
const { GenericContainer } = require("testcontainers");
require('dotenv').config();

const buildContext = path.resolve(__dirname);


jest.setTimeout(500000);

describe("Query movie data", () => {
    let startedContainer;
    let conn;

    beforeAll(async () => {

        const container = await GenericContainer.fromDockerfile(buildContext)
            .build();
        console.log("Building docker image...");

        startedContainer = await container
            .withExposedPorts(3307)
            .start();
        console.log("Start docker container...");

        console.log(startedContainer.getNetworkNames())
        conn = mysql.createConnection({
            host: startedContainer.getIpAddress(startedContainer.getNetworkNames()[0]),
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: startedContainer.getMappedPort(3307),
        });
        console.log("Connect to MySQL...")
    });

    afterAll(async () => {
        await startedContainer.stop();
    });

    test.each([
        [['1', '3'], 3, "The Shawshank Redemption"],
        [['1st', '3rd'], 3, "The Shawshank Redemption"],
        [["first"], 1, "The Shawshank Redemption"],
        [["top", "1"], 1, "The Shawshank Redemption"],
    ])("QueryRank", async (entities, recordCount, movieName) => {
        movie.mappingFunc["movie_rank"](entities, conn, function (result) {
            expect(result.length).toEqual(recordCount);
            expect(result[0].name).toEqual(123);
        });
    });


    test("QueryYear", async () => {
        var entities = ['GodFather', 'The Dark Knight']
        movie.mappingFunc["movie_year"](entities, conn, function (result) {
            expect(result.length).toEqual(2);
            expect(result[0].year).toEqual(2008);
        });
    });

    test("queryActors", async () => {
        var entities = ['GodFather', 'The Dark Knight']
        movie.mappingFunc["movie_actors"](entities, conn, function (result) {
            expect(result.length).toEqual(2);
            expect(result[0].actors[0]).toEqual("Marlon Brando");
        });
    });

    test("queryDirector", async () => {
        var entities = ['GodFather', 'The Dark Knight']
        movie.mappingFunc["movie_director"](entities, conn, function (result) {
            expect(result.length).toEqual(2);
            expect(result[0].director).toEqual("Christopher Nolan");
        });
    });

    test("queryRating", async () => {
        var entities = ['GodFather', 'The Dark Knight']
        movie.mappingFunc["movie_rating"](entities, conn, function (result) {
            expect(result.length).toEqual(2);
            expect(result[0].rating).toEqual(9.2);
        });
    });

    test("queryGenre", async () => {
        var entities = ['action']
        movie.mappingFunc["movie_genre"](entities, conn, function (result) {
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual("The Dark Knight");
        });
    });

    test("queryDirectorMovies", async () => {
        var entities = ['Christopher Nolan']
        movie.mappingFunc["direct_movies"](entities, conn, function (result) {
            expect(result.length).toEqual(1);
            expect(result[0].name).toEqual("The Dark Knight");
        });
    });

});


