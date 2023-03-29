import csrfFetch from './csrf'

const SET_CURRENT_USER = 'session/setCurrentUser'
const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
})

const removeCurrentUser = userId => ({
    type: REMOVE_CURRENT_USER,
})

export const login = user => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await res.json();
    // sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    dispatch(setCurrentUser(data.user))
    return res
}

// const sessionReducer = (state = {}, action) => {
//     const nextState = { ...state }

//     switch (action.type) {
//         case SET_CURRENT_USER:
//             nextState[action.payload.id] = action.payload
//             return nextState
//         case REMOVE_CURRENT_USER:
//             delete nextState[action.payload.userId]
//             return nextState
//         default:
//             return state
//     }
// }

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;