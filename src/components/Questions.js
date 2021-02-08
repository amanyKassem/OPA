import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Questions({navigation}) {


    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('faq') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.rowGroup , styles.Width_100]}>

                        <TouchableOpacity onPress={() => navigation.navigate('adFee' , {pathName:'questions'})} style={[styles.directionRowCenter,styles.Width_48 , styles.marginBottom_15 , styles.Radius_15, styles.height_90,{backgroundColor:'#fde7dd'}]}>
                            <Image source={require("../../assets/images/money.png")} style={[styles.icon35,{marginRight:10}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.textSize_14, styles.textCenter , {color:'#e47142'} ]}>{ i18n.t('adFee') }</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('faq', {pathName:'questions'})} style={[styles.directionRowCenter,styles.Width_48 , styles.marginBottom_15 , styles.Radius_15, styles.height_90,{backgroundColor:'#c6edf6'}]}>
                            <Image source={require("../../assets/images/questions.png")} style={[styles.icon35,{marginRight:10}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.textSize_14, styles.textCenter , {color:'#2995ae'} ]}>{ i18n.t('faq') }</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('userManual', {pathName:'questions'})} style={[styles.directionRowCenter,styles.Width_48 , styles.marginBottom_15 , styles.Radius_15, styles.height_90,{backgroundColor:'#d4d6f6'}]}>
                            <Image source={require("../../assets/images/guide.png")} style={[styles.icon35,{marginRight:10}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.textSize_14, styles.textCenter , {color:'#878bd6'} ]}>{ i18n.t('userManual') }</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Questions;


