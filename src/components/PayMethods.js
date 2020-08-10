import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {Container, Content,Radio} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function PayMethods({navigation}) {

    const [payMethod, setPayMethod] = useState('0');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('payMethods') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_35 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                        <View style={[styles.rowGroup]}>
                            <TouchableOpacity onPress={() => setPayMethod('0')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/mastercard.png")} style={[styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '0'}
                                        onPress={() => setPayMethod('0')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Master card</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('1')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/visa.png")} style={[styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '1'}
                                        onPress={() => setPayMethod('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Visa card</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('2')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/Mada_Logo.png")} style={[styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '2'}
                                        onPress={() => setPayMethod('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Mada</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('3')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/paypal.png")} style={[styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '3'}
                                        onPress={() => setPayMethod('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Paypal</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('reviewAd')} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default PayMethods;


