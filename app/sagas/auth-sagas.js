import saga from 'redux-saga';
import { put, call, watch, takeEvery } from 'redux-saga/effects';
import UserActions from '../reducers/user-actions';
import Axios from 'axios';
import { LoginStatus } from '../constants';

let loginUserService = payload => {
    return Axios.post("/login", payload, {
        maxRedirects: 0,
        withCredentials: true
    }).then(response => response.data);
}

export function* loginSaga(action) {
    if (!action || !action.payload) return put({ type: UserActions.LOGIN_FAILURE });

    try {
        const response = yield call(loginUserService, action.payload); 
        if (response.status === LoginStatus.SUCCESS) {
            yield put({ type: UserActions.LOGIN_SUCCESS, payload: response });
        } else {
            yield put({ type: UserActions.LOGIN_FAILURE , payload: response })
        }
    } catch(error) {
        yield put({ type: UserActions.LOGIN_FAILURE, payload: { error } })
    }
}

  
export function* watchLoginRequest() {
    yield takeEvery(UserActions.REQUEST_LOGIN, loginSaga)
}