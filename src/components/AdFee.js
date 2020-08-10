import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Vibration,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, CheckBox, Form, Item, Label, Input, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdFee({navigation}) {

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('adFee') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                        <View>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_5]}>-- الخيارالاول (مناسب للملاك)</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , styles.marginBottom_10 , {lineHeight:22}]}>
                                رسوم التأجير : 95 ريال
                                رسوم البيع : 120 ريال
                            </Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_5]}>-- الخيارالاول (مناسب للمكاتب و المسوقين)</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14  , styles.marginBottom_10, {lineHeight:22}]}>
                                رسوم التأجير : 95 ريال
                                رسوم البيع : 120 ريال
                            </Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_5]}>-- النقاط التوضيحية</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , {lineHeight:22}]}>
                                هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                                هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                                هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            </Text>
                        </View>

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


