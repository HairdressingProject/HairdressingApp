import { createAction } from '@reduxjs/toolkit';

/**
 * @var {ActionCreatorWithoutPayload<"ERROR">} errorMessageAction - Creates an error message action for the logger
 */
export const errorMessageAction = createAction('ERROR');

/**
 * @var {ActionCreatorWithoutPayload<"ERROR">} errorMessageAction - Creates a clear message action for the logger
 */
export const clearMessageAction = createAction('CLEAR');

/**
 * @var {ActionCreatorWithoutPayload<"ERROR">} errorMessageAction - Creates a success message action for the logger
 */
export const successMessageAction = createAction('SUCCESS');