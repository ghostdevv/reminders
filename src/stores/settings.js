import { createWritable } from '../helpers/PeristentStore.js';

export const webhookURL = createWritable('webhook', '');
export const userID = createWritable('userID', '');
export const pingOnSend = createWritable('pingOnSend', true);
