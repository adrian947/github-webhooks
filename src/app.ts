import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/github.controller';
import { GithubSha256Middleware } from './presentation/middlewares/verifySignature.middleware';

(() => {
  main();
})();

function main() {
  const app = express();
  app.use(express.json());
  const githubController = new GithubController();

  app.use(GithubSha256Middleware.verifySignature);
  app.post('/api/github', githubController.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server listening on port ${envs.PORT}`);
  });
}
