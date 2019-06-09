import { all } from 'redux-saga/effects';
import { loginSaga, watchLoginRequest } from './auth-sagas';

export default function* rootSaga() {
    yield all([
        loginSaga(),
        watchLoginRequest()
    ])
}