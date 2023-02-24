CREATE TABLE IF NOT EXISTS imdb (
    id                  int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name                varchar(255),
    rank_               int,
    year                int,
    genre               JSON,
    director            varchar(120),
    rating              float(4,2),
    actors              JSON,
    CONSTRAINT Unique_Movie UNIQUE(name, year, director)
);
INSERT INTO imdb (rank_, name, year, genre, director, rating, actors)
VALUES ( 1, "The Shawshank Redemption",  1994,  '["Drama"]', "Frank Darabont", 9.3, '["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown", "Gil Bellows", "Mark Rolston", "James Whitmore", "Jeffrey DeMunn", "Larry Brandenburg", "Neil Giuntoli", "Brian Libby", "David Proval", "Joseph Ragno", "Jude Ciccolella", "Paul McCrane", "Renee Blaine", "Scott Mann"]')
ON DUPLICATE KEY UPDATE
  id = id ;
  
INSERT INTO imdb (rank_, name, year, genre, director, rating, actors)
VALUES (2, "The Godfather", 1972, '["Crime", "Drama"]', "Francis Ford Coppola", 9.2, '["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton", "Richard S. Castellano", "Robert Duvall", "Sterling Hayden", "John Marley", "Richard Conte", "Al Lettieri", "Abe Vigoda", "Talia Shire", "Gianni Russo", "John Cazale", "Rudy Bond", "Al Martino", "Morgana King", "Lenny Montana"]')
ON DUPLICATE KEY UPDATE
  id = id ;
  
INSERT INTO imdb (rank_, name, year, genre, director, rating, actors)
VALUES (3, "The Dark Knight", 2008,'["Action", "Crime", "Drama"]', "Christopher Nolan", 9.0, '["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal", "Gary Oldman", "Morgan Freeman", "Monique Gabriela Curnen", "Ron Dean", "Cillian Murphy", "Chin Han", "Nestor Carbonell", "Eric Roberts", "Ritchie Coster", "Anthony Michael Hall", "Keith Szarabajka", "Colin McFarlane", "Joshua Harto"]')
ON DUPLICATE KEY UPDATE
  id = id ;
