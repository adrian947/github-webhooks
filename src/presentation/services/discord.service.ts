import { envs } from '../../config';

export class DiscordService {
  private readonly discordUrl: string = envs.DISCORD_URL;

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        {
          image: {
            url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExanYydDExbjBqYnozbzZ4N240aXF2MW85eTdnNjVtMnB2bzl2Nm42dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif',
          },
        },
      ],
    };

    const response = await fetch(this.discordUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response) {
      throw new Error('Error Discord');
    }
    return true;
  }
}
