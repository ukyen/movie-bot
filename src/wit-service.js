const { Wit } = require('node-wit');

class WitService {
  constructor(accessToken, logger) {
    this.client = new Wit({ accessToken: accessToken, logger: logger });
  }

  async query(text) {
    const queryResult = await this.client.message(text);

    const { intents, entities } = queryResult;

    const extractedEntities = [];

    Object.keys(entities).forEach((key) => {
      entities[key].forEach(item => {
        extractedEntities.push(
          {
            name: item.name,
            value: item.value,
            confidence: item.confidence,
          })
      }
      )
    });
    return {
      text: queryResult.text,
      intents: intents,
      entities: extractedEntities
    };
  }
}

module.exports = WitService;