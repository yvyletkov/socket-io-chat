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
        case 'SET-NEW-MESSAGE': {
            return {...state,
                messages: [...state.messages, action.payload]
            }
        }
        default: {
            return state
        }
    }
}