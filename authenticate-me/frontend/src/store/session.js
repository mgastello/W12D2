import csrfFetch from './csrf'

export const SET_CURRENT_USER = 'session/SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER'

export const loginUser = user => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user))
    dispatch(setCurrentUser(data.user))
    return res
}

const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
})

const removeCurrentUser = userId => ({
    type: REMOVE_CURRENT_USER,
    payload: userId
})

const sessionReducer = (state = {}, action) => {
    const nextState = { ...state }

    switch (action.type) {
        case SET_CURRENT_USER:
            nextState[action.payload.id] = action.payload
            return nextState
        case REMOVE_CURRENT_USER:
            delete nextState[action.payload.userId]
            return nextState
        default:
            return state
    }
}

export default sessionReducer;