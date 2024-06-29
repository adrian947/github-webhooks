export class GithubService {
  public onStart = (payload: any): string => {
    const { action, sender, repository, starred_at } = payload;

    if (starred_at) {
      return `User ${sender.login} ${action} star on ${repository.full_name}`;
    }else{
		return `User ${sender.login} ${action} delete star ${repository.full_name}`;

	}

	throw new Error('Algo salio mal')
  };
  public onIssue = (payload: any): string => {
    const { action, issue } = payload;

    if (action === 'opened') {
      return `An issue was opened with this title ${issue.title}`;
    }
    if (action === 'closed') {
      return `An issue was closed by ${issue.user.login}`;
    }
    if (action === 'reopened') {
      return `An issue was reopened by ${issue.user.login}`;
    }

	throw new Error('Algo salio mal')
  };
}
