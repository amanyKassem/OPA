import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Vibration} from "react-native";
import {Container, Content, Card, CheckBox, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AddAdTerms({navigation}) {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('adTerms') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30, styles.directionColumn,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[{flex:1}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_10]}>-- { i18n.t('adCondi') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , styles.marginBottom_10, {lineHeight:22}]}>
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        </Text>

                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , styles.marginBottom_10 , {lineHeight:22}]}>
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('terms')}
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


