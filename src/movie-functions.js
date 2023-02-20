function _processRankStr(rankStr) {
    if (rankStr.toLowerCase() === "top" || rankStr.toLowerCase() === "first") {
        return "1"
    }
    return rankStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
}

function queryRank(ranks, conn, callback) {
    if (ranks.length === 1) {
        condition = "= " + _processRankStr(ranks[0]);
    } else {
        condition = "BETWEEN " + _processRankStr(ranks[0]) + " AND " + _processRankStr(ranks[1]);
    }
    sql = `select name, year from imdb where rank_ ${condition}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    {
                        name: item.name,
                        year: item.year
                    }
                );
            });
            return callback(queryResults);
        }
    });
}


function queryYear(movie_names, conn, callback) {
    conditions = []
    movie_names.forEach(item => {
        conditions.push("LOWER(imdb.name) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, year from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    {
                        name: item.name,
                        year: item.year
                    }
                );
            });
            return callback(queryResults);
        }
    });
}

function queryActors(movie_names, conn, callback) {
    conditions = []
    movie_names.forEach(item => {
        conditions.push("LOWER(imdb.name) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, actors from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    { name: item.name, actors: item.actors }
                );
            });
            return callback(queryResults);
        }
    });
}

function queryDirector(movie_names, conn, callback) {
    conditions = []
    movie_names.forEach(item => {
        conditions.push("LOWER(imdb.name) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, director from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    { name: item.name, director: item.director }
                );
            });
            return callback(queryResults);
        }
    });
}

function queryRating(movie_names, conn, callback) {
    conditions = []
    movie_names.forEach(item => {
        conditions.push("LOWER(imdb.name) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, rating from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    { name: item.name, rating: item.rating }
                );
            });
            return callback(queryResults);
        }
    });
}

function queryGenre(movie_genre, conn, callback) {
    conditions = []
    movie_genre.forEach(item => {
        conditions.push("LOWER(imdb.genre) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, year, rating from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    {
                        name: item.name,
                        year: item.year,
                        rating: item.rating
                    }
                )
            });
            return callback(queryResults);
        }
    });
}


function queryDirectorMovies(director_names, conn, callback) {
    conditions = []
    director_names.forEach(item => {
        conditions.push("LOWER(imdb.director) LIKE '%" + item.toLowerCase() + "%'");
    });
    sql = `select name, year, director from imdb where ${conditions.join(" OR ")}`
    console.log(`sql = ${sql}`);
    conn.execute(sql, function (err, result) {
        if (err) {
            console.error(err);
        }
        else {
            queryResults = []
            result.forEach(item => {
                queryResults.push(
                    {
                        name: item.name,
                        year: item.year,
                        director: item.director
                    }
                )
            });
            return callback(queryResults);
        }
    });
}


mappingFunc = {
    movie_rank: queryRank,
    movie_year: queryYear,
    movie_actors: queryActors,
    movie_director: queryDirector,
    movie_rating: queryRating,
    movie_genre: queryGenre,
    direct_movies: queryDirectorMovies,
}

module.exports = { mappingFunc };