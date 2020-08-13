import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,I18nManager} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Terms({navigation , route}) {

    const pathname = route.params ? route.params.pathname : null


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <View style={[styles.directionRowSpace , styles.paddingHorizontal_25, styles.paddingTop_30]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_20, {top:20}]}>{ i18n.t('terms') }</Text>
                    <Image source={require('../../assets/images/vector_rules.png')} style={[styles.transform,styles.icon200, {top:20, right:I18nManager.isRTL ?10:50}]} resizeMode={'contain'} />
                </View>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/selected.png')} style={[styles.icon35, {top:-18 , left:20}]} resizeMode={'contain'} />

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5,styles.alignStart]}>-- { i18n.t('terms') }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14,styles.alignStart , {lineHeight:22}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5,styles.alignStart, styles.marginTop_15]}>-- { i18n.t('policy&Privacy') }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14,styles.alignStart , {lineHeight:22}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>


                    <TouchableOpacity onPress={() => navigation.navigate(route && pathname ==='terms'?'addAdTerms':'register')}
                                      style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_35]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                    </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default Terms;


