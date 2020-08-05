import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {Container, Content, Form, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import { chooseLang } from '../actions';

function Language({}) {

    const [lang, setLang] = useState('en');

    const language = useSelector(state => state.lang);
    console.log("language" , language.lang)

    const dispatch = useDispatch()

    function selectLang(newLang) {
        if(newLang !== lang){
            setLang(newLang)
        }
    }
    function onChooseLang(){
        if(language !== lang){
            dispatch(chooseLang(lang))
        }
    }


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>
                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_45]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_60]} resizeMode={'contain'} />


                    <TouchableOpacity onPress={() => selectLang('ar')} style={[styles.chooseLang , styles.directionRowSpace , styles.marginBottom_30 , styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.bg_green , styles.paddingHorizontal_10 , {position:'absolute' ,top:-12 , left:0}]}>العربية</Text>
                        <Image source={require('../../assets/images/saudi_flag.png')} style={[styles.icon25 , styles.marginTop_5]} resizeMode={'contain'} />
                        {
                            lang === 'ar' ?
                                <Image source={require('../../assets/images/right.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                :
                                null
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectLang('en')} style={[styles.chooseLang , styles.directionRowSpace , styles.marginBottom_30 , styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_mstarda , styles.textSize_14 , styles.bg_green , styles.paddingHorizontal_10 , {position:'absolute' ,top:-12 , left:0}]}>English</Text>
                        <Image source={require('../../assets/images/en_flag.png')} style={[styles.icon25 , styles.marginTop_5]} resizeMode={'contain'} />
                        {
                            lang === 'en' ?
                                <Image source={require('../../assets/images/right.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                :
                                null
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onChooseLang} style={[styles.mstardaBtn , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('choose') }</Text>
                    </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default Language;


