import { createAction, createActions } from "redux-actions";

export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");

export const modalProfile = createActions({
    openModalProfile: undefined,
    closeModalProfile: undefined
})