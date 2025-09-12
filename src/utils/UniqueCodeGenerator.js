import {nanoid} from 'nanoid';

export function generateUniqueCode(prefix = '' , length = 6) {
    return `${prefix}-${nanoid(length).toUpperCase()}`;
}