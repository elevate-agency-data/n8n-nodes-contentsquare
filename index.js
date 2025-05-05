// This file ensures n8n can find and load your nodes and credentials
const { Contentsquare } = require('./dist/nodes/Contentsquare/Contentsquare.node.js');

module.exports = {
	nodeTypes: {
		Contentsquare: Contentsquare,
	},
	credentialTypes: {
		ContentsquareApi: require('./dist/credentials/ContentsquareApi.credentials.js').ContentsquareApi,
	},
};
