import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Terms({navigation}) {


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.directionRowSpace , styles.paddingHorizontal_25, styles.paddingTop_30]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_20]}>{ i18n.t('terms') }</Text>
                    <Image source={require('../../assets/images/vector_one.png')} style={[styles.icon200, {top:20, right:-10}]} resizeMode={'contain'} />
                </View>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/selected.png')} style={[styles.icon35, {top:-18 , left:20}]} resizeMode={'contain'} />

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>-- { i18n.t('terms') }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , {lineHeight:22}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>


                    <TouchableOpacity onPress={() => navigation.navigate('register')}
                                      style={[styles.mstardaBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_35]}>
                        <Text style={[styles.textRegular , styles.text_green , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                    </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default Terms;


