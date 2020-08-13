import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Contracting({navigation}) {

    function renderCities() {
        let cities = [];
        for (let i = 0; i < 3; i++) {
            if(i === 0){
                cities.push(
                    <TouchableOpacity onPress={() => navigation.navigate('realEstateComp')} key={i} style={[styles.Width_100, styles.height_150 , styles.marginBottom_25]}>
                        <View style={[styles.imgOverLay]}/>
                        <View style={[styles.alignStart,{position:'absolute' , bottom :10 ,left:15,zIndex:1}]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.alignStart]}>9/7/2019</Text>
                            <Text style={[styles.textBold , styles.text_White , styles.textSize_12, styles.alignStart]}>شركات العقارات</Text>
                        </View>
                        <Image source={require("../../assets/images/arch1.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                    </TouchableOpacity>
                )
            }else{
                cities.push(
                    <TouchableOpacity onPress={() => navigation.navigate('realEstateComp')} key={i} style={[styles.Width_48, styles.height_250]}>
                        <View style={[styles.imgOverLay]}/>
                        <View style={[styles.alignStart,{position:'absolute' , bottom :10 ,left:15,zIndex:1}]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.alignStart]}>9/7/2019</Text>
                            <Text style={[styles.textBold , styles.text_White , styles.textSize_12, styles.alignStart]}>شركات العقارات</Text>
                        </View>
                        <Image source={require("../../assets/images/arch2.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                    </TouchableOpacity>
                )
            }
        }
        return cities
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('contracting') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_14 ]}>{ i18n.t('contServ') }</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('allContracting')}>
                            <Text style={[styles.textBold , styles.text_babyblue , styles.textSize_14 , styles.textDecoration ]}>{ i18n.t('all') }</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.directionRowSpace , styles.marginTop_15, styles.Width_100]}>
                        <TouchableOpacity onPress={() => navigation.navigate('realEstateComp')} style={[styles.Width_48, styles.height_130]}>
                            <View style={[styles.imgOverLay]}/>
                            <View style={[styles.flexCenter,{position:'absolute' , top :'35%',zIndex:1}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>شركات العقارات</Text>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>اكثر من 100 شركه</Text>
                            </View>
                            <Image source={require("../../assets/images/build1.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('realEstateComp')} style={[styles.Width_48, styles.height_130]}>
                            <View style={[styles.imgOverLay]}/>
                            <View style={[styles.flexCenter,{position:'absolute' , top :'35%',zIndex:1}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>شركات العقارات</Text>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>اكثر من 100 شركه</Text>
                            </View>
                            <Image source={require("../../assets/images/build2.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.directionRowSpace , styles.marginTop_15]}>
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_14 ]}>{ i18n.t('newCities') }</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('allContracting')}>
                            <Text style={[styles.textBold , styles.text_babyblue , styles.textSize_14 , styles.textDecoration ]}>{ i18n.t('all') }</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.rowGroup  , styles.marginBottom_80]}>
                        {renderCities()}
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Contracting;


