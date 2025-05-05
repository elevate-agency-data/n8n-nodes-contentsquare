import { 
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class ContentsquareApi implements ICredentialType {
	name = 'contentsquareApi';
	displayName = 'Contentsquare API';
	documentationUrl = 'https://docs.contentsquare.com/en/api/export/';
  icon: Icon = 'file:icons/contentsquare.svg';
	properties: INodeProperties[] = [
    {
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			required: true,
			description: 'The OAuth client_id generated from the Contentsquare console'
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
			required: true,
			description: 'The OAuth client_secret generated from the Contentsquare console.'
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			description: 'Required only if you use account-level OAuth credentials, to specify which project of the account you want to target'
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: '',
			required: true,
			description: 'Specify a scope to get a token that can query API (data-export, metrics, speed-analysis)'
		}
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
        'Content-Type': 'application/json'
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
      method: 'POST',
			url: 'https://api.contentsquare.com/v1/oauth/token',
			headers: {
        'Content-Type': 'application/json'
			},
			body: {
				client_id: '={{$credentials.clientId}}',
				client_secret: '={{$credentials.clientSecret}}',
				grant_type: 'client_credentials',
        scope: '={{$credentials.scope}}',
        project_id: '={{$credentials.projectId}}'
			},
			json: true,
		},
	};
}
