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
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('postAdConfirmation') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_35 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30 ,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50,alignItems:'center'}]}>

                    <TouchableOpacity style={[styles.flexCenter]} onPress={() => navigation.navigate('myAds')}>
                        <Image source={require('../../assets/images/success_send_ads.png')} style={[styles.icon200 ]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_15 , styles.marginBottom_10 , styles.textCenter]}>{ i18n.t('adPosted') }</Text>
                        {/*<Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13 , styles.textCenter,{lineHeight:20}]}>*/}
                            {/*نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص*/}
                            {/*ص نص نص نص نص*/}
                        {/*</Text>*/}
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default ConfirmPost;


