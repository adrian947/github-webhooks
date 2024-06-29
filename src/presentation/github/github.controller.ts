import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/discord.service';

export class GithubController {
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService(),
  ) {}

  public webhookHandler = async (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';

    const payload = req.body;

    let message: string = '';

    const eventHandlers: { [key: string]: (payload: any) => string } = {
      star: this.githubService.onStart,
      issues: this.githubService.onIssue,
    };

    message = eventHandlers[githubEvent](payload);
    console.log('🚀 ~ message:', message);

    try {
      await this.discordService.notify(message);
    } catch (error) {
      res.status(400).json({ error });
    }

    res.status(201).json('Accepted');
  };
}
