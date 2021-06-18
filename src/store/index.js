import { createStoreon } from 'storeon';

import { notifications } from './notifications';
import { user } from './user';

export const store = createStoreon([user, notifications]);
