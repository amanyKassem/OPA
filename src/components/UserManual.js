import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function UserManual({navigation}) {


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('userManual') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>-- القائمة الخاصة بالتطبيق</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, {lineHeight:22}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>
                    <View style={[styles.directionBasicRow,styles.marginTop_10, styles.Width_100 , styles.marginBottom_10]}>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, {lineHeight:22 , flex:1}]}>
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        </Text>
                        <Image source={require("../../assets/images/pic_one.png")} style={[styles.width_100 , styles.height_160,{marginLeft:10}]} resizeMode={'contain'} />
                    </View>

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5]}>-- الصفحة الرئيسية الخاصة بالتطبيق</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, {lineHeight:22}]}>
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                    </Text>
                    <View style={[styles.directionBasicRow,styles.marginTop_10, styles.Width_100]}>
                        <Image source={require("../../assets/images/pic_two.png")} style={[styles.width_100 , styles.height_160,{marginRight:10}]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, {lineHeight:22 , flex:1}]}>
                            هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                            هذا نص مثال هذا نص مثال هذا نص هذا نص مثال هذا نص مثال هذا نص مثال هذا نص مثال
                        </Text>
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default UserManual;


