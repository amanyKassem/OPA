import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Vibration} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Orders({navigation}) {


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orders') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,styles.flexCenter,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <TouchableOpacity style={[styles.flexCenter]} onPress={() => navigation.navigate('contracting')}>
                        <Image source={require('../../assets/images/no_notifcation.png')} style={[styles.icon150 , styles.marginBottom_25 ]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_10 , styles.textCenter]}>{ i18n.t('noNotifications') }</Text>
                    </TouchableOpacity>
                </View>

            </Content>
        </Container>
    );
}

export default Orders;


