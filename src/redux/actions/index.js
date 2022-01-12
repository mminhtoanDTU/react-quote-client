export const getType = (reduxAction) => {
    return reduxAction().type;
}

export * from './Post';
export * from './User';

export * from './Modal';



/*
    getType(getPosts.getPostSuccess)
    👇
    {
        type: 'getPostSuccess', //Lay duoc thang nay de biet la action gi`
        payload: {
            name: 'Hello'
        }
    }
*/