import React from 'react';
import path from 'path';

const IPFS = require('electron').remote.require('ipfs');

const node = new IPFS({
	repo: path.join(__dirname, 'repo'),
	EXPERIMENTAL: {
		pubsub: true
	}
});

node.on('start', () => {
	node.pubsub.peers('test', (err, peers) => {
		console.log(err);
		console.log(peers);
	});
});

export default (
	<div>It Worked!</div>
)
