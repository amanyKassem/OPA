import React , {useEffect} from "react";
import {View, Text, Image, I18nManager, Dimensions} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AboutApp({navigation}) {


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('aboutApp') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon130 , styles.marginBottom_20 , styles.SelfCenter ]} resizeMode={'contain'} />
                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_15 , styles.marginBottom_10, styles.alignStart]}>-- { i18n.t('aboutApp') }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.marginBottom_10 , {lineHeight:22,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>
                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_15 , styles.marginBottom_10, styles.alignStart]}>-- { i18n.t('aboutApp') }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , {lineHeight:22,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>

                </View>

            </Content>
        </Container>
    );
}

export default AboutApp;


