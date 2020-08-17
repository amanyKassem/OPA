import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, Vibration, ActivityIndicator} from "react-native";
import {Container, Content, Card, CheckBox, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getAdTerms} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AddAdTerms({navigation}) {

    const [isChecked, setIsChecked] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const adTerms = useSelector(state => state.adTerms.adTerms)
    const loader = useSelector(state => state.adTerms.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getAdTerms(lang , token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    return (
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('adTerms') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30, styles.directionColumn,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100,{flex:1}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_10, styles.alignStart]}>-- { i18n.t('adCondi') }</Text>

                        {
                            adTerms ?
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , styles.marginBottom_10, {lineHeight:22,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                                    {adTerms.ad_conditions}
                                </Text>
                                :
                                null
                        }

                        <TouchableOpacity onPress={() => navigation.navigate('terms',{pathname:'terms'})}
                                          style={[styles.Width_100 , styles.marginTop_5  , styles.directionRow]}>
                            <CheckBox style={[styles.checkBox, {marginRight:15 , left:0}]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.babyblue}/>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textDecoration , styles.textSize_14]}>{ i18n.t('agreeTo') }</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('addUrAd')}
                                      style={[styles.babyblueBtn , styles.flexCenter , styles.Width_85, styles.marginBottom_50 , styles.marginTop_35]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default AddAdTerms;


