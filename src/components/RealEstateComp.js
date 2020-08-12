import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, FlatList} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function RealEstateComp({navigation}) {

    const ads = [
        {id:'0' , title:'شركات مقاولات و اسمها' , desc:"www.moawlat.com"},
        {id:'1' , title:'شركات مقاولات و اسمها' , desc:"www.moawlat.com"},
        {id:'2' , title:'شركات مقاولات و اسمها' , desc:"www.moawlat.com"},
        {id:'3' , title:'شركات مقاولات و اسمها' , desc:"www.moawlat.com"},
        {id:'4' , title:'شركات مقاولات و اسمها' , desc:"www.moawlat.com"},
    ];

    function Item({ title , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('realEstateDet')} style={[styles.height_130,styles.marginBottom_10 , {flex:1}]}>
                <View style={[styles.imgOverLay]}/>
                <View style={[styles.alignStart,{position:'absolute' , bottom :10 ,left:15,zIndex:1}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{title}</Text>
                    <View style={[styles.directionRow]}>
                        <Image source={require("../../assets/images/white_global.png")} style={[styles.icon15 , {marginRight:5}]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{desc}</Text>
                    </View>
                </View>
                <Image source={require("../../assets/images/build1.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
            </TouchableOpacity>
        );
    }


    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('realEstateComp') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <View style={[{height:height - 100,paddingBottom:10}]}>

                        <FlatList
                            data={ads}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                desc={item.desc}
                                id={item.id}
                                index={index}
                            />}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default RealEstateComp;


