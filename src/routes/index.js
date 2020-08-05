import React , {useEffect} from "react";
import {  AsyncStorage } from 'react-native';
import { NavigationContainer  } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackNavigator } from './AuthStackNavigator'
import { MainStackNavigator } from './MainStackNavigator'
import {useSelector} from 'react-redux';


const RootStack = createStackNavigator();

function renderScreens() {
	// const auth = useSelector(state => state.auth);
	const auth = true;


	// if (auth.user !== null) {
	if (auth) {
		return (
			<RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
		)
	}
	return (<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator}/>)
}

function AppNavigator() {

	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{headerShown: false}} >
				{ renderScreens() }
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
