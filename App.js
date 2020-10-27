import React , {useState , useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
import { Notifications } from 'expo'

function App({navigation}) {

	const [isReady, setIsReady] = useState(false);

	useEffect( () => {

		// I18nManager.forceRTL(true);
		// AsyncStorage.clear();

		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('orders', {
				name: 'Chat messages',
				sound: true,
			});
		}

		async function loadFont(){
			await Font.loadAsync({
				cairo             : require('./assets/fonts/Cairo-Regular.ttf'),
				cairoBold         : require('./assets/fonts/Cairo-Bold.ttf'),
				Roboto            : require('native-base/Fonts/Roboto.ttf'),
				Roboto_medium     : require('native-base/Fonts/Roboto_medium.ttf'),
				...Ionicons.font,
			});
			setIsReady(true)
		}
		loadFont();

	}, []);

	if (!isReady) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistedStore}>
				<Root>
					<AppNavigator />
				</Root>
			</PersistGate>
		</Provider>
	);
}

export default App;


//
// Keystore credentials
// Keystore password: dccce62a7c4d4f79b9187a6a7f9ed378
// Key alias:         QG1fc2hhbXMvT1BB
// Key password:      72eb14f68abb4b5e8afdfe1a448314be
