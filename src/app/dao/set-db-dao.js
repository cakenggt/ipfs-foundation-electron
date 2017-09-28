import SetDB from 'set-db';
import {multihash} from 'is-ipfs';
const ipfsd = require('electron').remote.require('ipfsd-ctl');

const dbHashKey = 'the.index.db';
const dbTopic = process.env.NODE_ENV === 'development' ?
	'the.index.development' : 'the.index.production';

export const FILE = 'FILE';
export const COMMENT = 'COMMENT';

var dbHash = localStorage.getItem(dbHashKey);

export const connect = new Promise((resolve, reject) => {
	ipfsd.local((err, node) => {
		node.startDaemon((err, ipfs) => {
			const db = new SetDB(dbTopic, {
				dbHash: dbHash,
				validator: elem => {
					if (elem.type === 'FILE') {
						return multihash(elem._id) && elem.name && elem.description && elem.category;
					} else if (elem.type === 'COMMENT') {
						return multihash(elem.fileId) && elem.text;
					}
					return false;
				},
				ipfs: ipfs
			});

			db.on('ready', () => resolve(db));
			db.on('error', err => reject(err));
			db.on('sync', () => {
				localStorage.setItem(dbHashKey, db.dbHash);
			});
		});
	});
});
