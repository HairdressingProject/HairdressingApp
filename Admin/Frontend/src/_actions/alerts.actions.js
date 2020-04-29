import { createAction } from '@reduxjs/toolkit';

export const errorMessageAction = createAction('ERROR');
export const clearMessageAction = createAction('CLEAR');
export const successMessageAction = createAction('SUCCESS');