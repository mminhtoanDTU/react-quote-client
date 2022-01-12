import { INIT_STATE } from "../../constant";
import { getType, hideModal, showModal, modalProfile } from "../actions";

export default function postsReducers(state = INIT_STATE.modal, action) {
    switch (action.type) {
        case getType(showModal):
            return {
                isShow: true
            }
        case getType(hideModal):
            return {
                isShow: false
            }

        case getType(modalProfile.closeModalProfile):
            return {
                isShowProfile: false,
            }
        case getType(modalProfile.openModalProfile):
            return {
                isShowProfile: true,
            }
        default:
            return state;
    }
}