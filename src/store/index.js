import { createStoreon } from 'storeon';

import { notifications } from './notifications';
import { user } from './user';
import { userTransactions } from './userTransactions';

export const store = createStoreon([user, notifications, userTransactions]);
