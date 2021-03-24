import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    BackHandler
} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function ConfirmPost({navigation}) {

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('myAds')
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('postAdConfirmation') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_35 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30 ,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50,alignItems:'center'}]}>

                    <TouchableOpacity style={[styles.flexCenter]} onPress={() => navigation.navigate('home')}>
                        <Image source={require('../../assets/images/success_send_ads.png')} style={[styles.icon200 ]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , styles.marginBottom_10 , styles.textCenter]}>{ i18n.t('adPosted') }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('home')} style={[styles.babyblueBtn , styles.bg_babyblue , styles.Width_100, styles.SelfCenter , styles.marginTop_35 ]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('home') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default ConfirmPost;


