export default (state, action) => {
    switch (action.type) {
        case 'SET-JOINED': {
            return {...state,
                isJoined: true,
                roomId: action.payload.roomId,
                userName: action.payload.userName
            }
        }
        case 'SET-USERS': {
            return {...state,
                users: action.users
            }
        }
        case 'SET-MESSAGES': {
            return {...state,
                messages: action.messages
            }
        }
        default: {
            return state
        }
    }
}