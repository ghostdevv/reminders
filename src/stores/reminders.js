import { createWritable } from '../helpers/PeristentStore.js';

export const reminders = createWritable('reminders', []);
