export default (state, action) => {
    switch (action.type) {
        case 'SET-JOINED': {
            return {...state,
                isJoined: action.payload,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        }
        default: {
            return state
        }
    }
}