import React , {useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    FlatList
} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Conversations({navigation}) {

    const conversations = [
        {id:'0' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'1' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق تم العثور علي طلب مطابقتم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'2' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'3' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'4' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'5' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'6' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'7' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
    ];

    function Item({ title ,body , time , count , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('chat')} style={[styles.marginBottom_15]}>
                <View style={[styles.directionRow]}>
                    <View style={[styles.borderMstarda, styles.icon50, styles.Radius_50 ,{borderColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                        <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull, styles.Radius_50]} resizeMode={'cover'} />
                        <View style={[styles.bg_mstarda ,styles.width_20 , styles.height_10, styles.Radius_5,styles.centerContext
                            ,{position:'absolute' , top:0 , zIndex:1}]}>
                            <Text style={[styles.textRegular , styles.text_green , styles.textSize_10]}>{ count }</Text>
                        </View>
                    </View>
                    <View style={[styles.directionColumnC, {flex:1, marginLeft:10}]}>
                        <View style={[styles.directionRowSpace]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart ,
                                {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{title}</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13 , styles.width_40 ]}>{ time }</Text>
                        </View>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ body }</Text>
                    </View>
                </View>
                <View style={[styles.line, styles.marginTop_15]}/>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('conversations') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.marginTop_20,{height:height - 170}]}>

                        <FlatList
                            data={conversations}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                body={item.body}
                                time={item.time}
                                id={item.id}
                                count={item.count}
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

export default Conversations;


