import { createStoreon } from 'storeon';

import { notifications } from './notifications';
import { user } from './user';
import { userCategories } from './userCategories';
import { userCurrency } from './userCurrency';
import { userTransactions } from './userTransactions';

export const store = createStoreon([user, notifications, userTransactions, userCategories, userCurrency]);
