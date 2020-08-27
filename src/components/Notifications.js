import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,FlatList , ActivityIndicator} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications , deleteNoti} from '../actions';
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Notifications({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);
    const notificationsLoader = useSelector(state => state.notifications.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getNotifications(lang, token))
    }
    function deleteNotify(id){
        dispatch(deleteNoti(lang , id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , notificationsLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [notifications]);

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (notifications && (notifications).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }


    function Item({ title ,body , time , id , ad_id, index }) {
        return (
            <TouchableOpacity onPress={ ad_id !== null ? () => navigation.navigate('listDetails', {ad_id}) : null} style={[styles.notiCard ,styles.marginBottom_10 , styles.paddingVertical_15,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <View style={[styles.paddingHorizontal_15 , styles.directionColumnC, {flex:1}]}>
                    <TouchableOpacity onPress = {() => deleteNotify(id)} style={[styles.paddingVertical_5 , styles.paddingHorizontal_5, styles.Radius_50
                        , {backgroundColor: index % 2 === 0 ? COLORS.green : COLORS.orange
                            , position:'absolute' , right:7 , top:-7}]}>
                        <Image source={require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14,styles.marginBottom_5, styles.alignStart ]}>{ title }</Text>
                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.alignStart ,
                            {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{body}</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13 , styles.width_40 , {alignSelf:'flex-end'} ]}>{ time }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>

            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('notifications') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_20,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50, justifyContent:notifications && (notifications).length <= 0 ? 'center' : 'flex-start' }]}>

                    {
                        notifications && (notifications).length > 0?
                            <View style={[{height:height - 115}]}>

                                <FlatList
                                    data={notifications}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        body={item.body}
                                        time={item.created_at}
                                        id={item.id}
                                        ad_id={item.ad_id}
                                        index={index}
                                    />}
                                    keyExtractor={item => item.id}
                                />

                            </View>
                            :
                            renderNoData()
                    }



                </View>

            </Content>
        </Container>
    );
}

export default Notifications;


