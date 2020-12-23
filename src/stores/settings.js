import { createWritable } from '../helpers/PeristentStore.js';

export const webhookURL = createWritable('webhook', '');
export const userID = createWritable('userID', '');
