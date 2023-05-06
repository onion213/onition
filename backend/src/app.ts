import * as bolt from '@slack/bolt'

const { App } = require(`@slack/bolt`)

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message(':wave:', async ({ message, say }) => {
  await say(`Hello, <@${(message as bolt.GenericMessageEvent).user}>`);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

