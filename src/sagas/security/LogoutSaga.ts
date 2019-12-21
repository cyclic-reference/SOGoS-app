import {call, put, select} from 'redux-saga/effects';
import {oauthConfigurationSaga} from '../configuration/ConfigurationConvienenceSagas';
import {createLoggedOffEvent} from '../../events/SecurityEvents';
import {activityLogoutSaga} from '../activity/LogoutActivitySaga';
import {revoke} from 'react-native-app-auth';
import {SecurityState} from '../../reducers/SecurityReducer';
import {selectSecurityState} from '../../reducers';

export function* logoffPreFlightSaga() {
  // do stuff
  yield call(activityLogoutSaga);
  yield put(createLoggedOffEvent()); // wipe state
}

export default function* logoutSaga() {
  const oAuthConfig = yield call(oauthConfigurationSaga);
  try {
    const security: SecurityState = yield select(selectSecurityState);
    yield call(revoke, oAuthConfig, {
      tokenToRevoke: security.refreshToken,
    });
  } catch (e) {}
  yield call(logoffPreFlightSaga);
}
