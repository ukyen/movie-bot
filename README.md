# Movie Bot

An application that allows users to query movie data with natural langauge.
When receiving a question from a user, the application post a request to
[Wit.ai](https://wit.ai/) to get the intents and entities of given question.
The application then query database based on the intents and entities. Finally,
return the data to frontend.

**Note**: The possible utterances have pre-trained on Wit.ai platform.

## Setup

Create an `.env` file and provide required configuration, see example:

```shell
WIT_API_KEY=<API_KEY_FROM_WIT_AI>
PORT=8000
DB_HOST="127.0.0.1"
DB_NAME="mysql"
DB_USERNAME="root"
DB_PASSWORD="12345678"
```

The environment variables will be read while launching application.

## Run & test

To launch the application, run `node src/index.js`.

To run the test cases, run `npm test`.
