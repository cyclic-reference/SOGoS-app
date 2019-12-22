import {call, put} from 'redux-saga/effects';
import {createReceivedOAuthConfigurations} from '../../events/ConfigurationEvents';
import {initialConfigurationFetchSaga} from './InitialConfigurationSagas';
import {AuthConfiguration} from 'react-native-app-auth';

export function* securityRequestSaga() {
  const initialConfig = yield call(initialConfigurationFetchSaga);
  const authConfigurations: AuthConfiguration = {
    issuer: initialConfig.issuer,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    redirectUrl: 'io.acari.sogos:/engage',
    additionalParameters: {
      prompt: 'login',
    },
    clientId: 'sogos-app',
    dangerouslyAllowInsecureHttpRequests: true, //todo: remove dis
  };
  yield put(createReceivedOAuthConfigurations(authConfigurations));
}