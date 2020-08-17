import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions, ActivityIndicator, I18nManager,
} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getAdFees} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdFee({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const adFees = useSelector(state => state.adFees.adFees)
    const loader = useSelector(state => state.adFees.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getAdFees(lang,token))
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

                <Header navigation={navigation} title={ i18n.t('adFee') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>


                        {
                            adFees?
                                <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_5, styles.alignStart]}>--{adFees.ad_fees}</Text>
                                :
                                null
                        }



                        <TouchableOpacity onPress={() => navigation.navigate('payMethods')} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('feeCommit') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default AdFee;


