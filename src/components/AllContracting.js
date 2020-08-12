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

function AllContracting({navigation}) {

    const ads = [
        {id:'0' , title:'شركات العقارات' , desc:"اكثر من 100 شركة"},
        {id:'1' , title:'شركات العقارات' , desc:"اكثر من 100 شركة"},
        {id:'2' , title:'شركات العقارات' , desc:"اكثر من 100 شركة"},
        {id:'3' , title:'شركات العقارات' , desc:"اكثر من 100 شركة"},
        {id:'4' , title:'شركات العقارات' , desc:"اكثر من 100 شركة"},
    ];

    function Item({ title , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('realEstateComp')} style={[styles.height_130,styles.marginBottom_10 , styles.marginHorizontal_5, {flex:1}]}>
                <View style={[styles.imgOverLay]}/>
                <View style={[styles.flexCenter,{position:'absolute' , top :'35%',zIndex:1}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{title}</Text>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{desc}</Text>
                </View>
                <Image source={require("../../assets/images/build1.jpg")} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
            </TouchableOpacity>
        );
    }


    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('allContracting') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <View style={[{height:height - 100,paddingBottom:10}]}>

                        <FlatList
                            data={ads}
                            horizontal={false}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                desc={item.desc}
                                id={item.id}
                                index={index}
                            />}
                            keyExtractor={item => item.id}
                            columnWrapperStyle={[styles.directionRowCenter]}
                        />

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default AllContracting;


