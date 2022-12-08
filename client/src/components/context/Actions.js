function setUser(user = null) {
    return {
        type: 'SET_USER',
        payload: user
    }
}

function updateStart(userCredentials){
    return{
        type: 'UPDATE_START'
    }
}

function updateSuccess(user){
    return{
        type: 'UPDATE_SUCCESS',
        payload: user,
    }
}

function updateFailure(){
    return{
        type: 'UPDATE_FAILURE',
    }
}

export {setUser, updateStart, updateSuccess, updateFailure}