export const INIT_STATE = {
    auth: {
        isLoading: false,
        currentUser: '',
        userId: '',
        errors: '',
        photoId: ''
    },
    posts: {
        isLoading: false,
        data: []
    },
    modal: {
        isShow: false
    },
    user: {
        isLoading: false,
        name: '',
        email: '',
        bio: '',
        photoId: '',
    }
}