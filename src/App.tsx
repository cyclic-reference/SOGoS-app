import React, {FC} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {fetchApplicationConfiguration} from './config/Configuration';
import RootView from './RootView';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const {store, persistor} = fetchApplicationConfiguration();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffb300',
    accent: '#2196f3',
  },
};

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <RootView />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
