import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking,
    FlatList,
    I18nManager,
    ActivityIndicator
} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getUserAds} from '../actions';
import Header from '../common/Header';
import Communications from "react-native-communications";
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdvertiserDetails({navigation , route}) {

    const user_id = route.params.user_id;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const userAds = useSelector(state => state.userAds.userAds);
    const userAdsLoader = useSelector(state => state.userAds.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getUserAds(lang, user_id , token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , userAdsLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [userAds]);

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
        if (userAds && (userAds.ads).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }

    function Item({ title ,location , price , image , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ desc.substr(0,30) }..</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('advertiserDetails') }/>

                {
                    userAds && userAds.user?

                        <View style={[styles.bgFullWidth, styles.paddingHorizontal_20, styles.bg_White,
                            styles.Width_100, styles.paddingTop_10,
                            {borderTopRightRadius: 50, borderTopLeftRadius: 50}]}>

                            <View style={[styles.directionBasicRow, styles.Width_100]}>
                                <View
                                    style={[styles.borderGreen, styles.Radius_50, styles.icon50, {overflow: 'hidden'}]}>
                                    <Image source={{uri: userAds.user.avatar}}
                                           style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'}/>
                                </View>
                                <View style={[{marginLeft: 10}]}>
                                    <Text
                                        style={[styles.textRegular, styles.text_midGray, styles.textSize_14, styles.alignStart]}>{userAds.user.name}</Text>
                                    <TouchableOpacity
                                        onPress={() => Communications.phonecall(userAds.user.phone, true)}>
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_14, styles.alignStart]}>{userAds.user.phone}</Text>
                                    </TouchableOpacity>
                                    {/*<View style={[styles.width_80, styles.marginTop_5]}>*/}
                                    {/*<StarRating*/}
                                    {/*disabled={true}*/}
                                    {/*maxStars={5}*/}
                                    {/*rating={3}*/}
                                    {/*fullStarColor={COLORS.mstarda}*/}
                                    {/*starSize={14}*/}
                                    {/*starStyle={styles.starStyle}*/}
                                    {/*/>*/}
                                    {/*</View>*/}
                                    <TouchableOpacity
                                        onPress={() => Communications.phonecall(userAds.user.contact_phone, true)}
                                        style={[styles.directionRow, styles.marginTop_5]}>
                                        <Image source={require('../../assets/images/phone_gray.png')}
                                               style={[styles.icon15, {marginRight: 5}]} resizeMode={'contain'}/>
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_14]}>{userAds.user.contact_phone}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => Communications.email([userAds.user.contact_email], null, null, 'My Subject', 'My body text')}
                                        style={[styles.directionRow, styles.marginTop_5]}>
                                        <Image source={require('../../assets/images/mail_gray.png')}
                                               style={[styles.icon15, {marginRight: 5}]} resizeMode={'contain'}/>
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_14]}>{userAds.user.contact_email}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => Linking.openURL(userAds.user.twitter)}
                                                      style={[styles.directionRow, styles.marginTop_5]}>
                                        <Image source={require('../../assets/images/twitter_gray.png')}
                                               style={[styles.icon15, {marginRight: 5}]} resizeMode={'contain'}/>
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_14]}>{userAds.user.twitter}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.line, styles.marginVertical_20]}/>
                            <View>
                                <Text
                                    style={[styles.textRegular, styles.text_midGray, styles.textSize_14]}>{i18n.t('adsOwner')}</Text>

                                <View style={[styles.marginTop_20]}>

                                    {renderNoData()}

                                    <FlatList
                                        data={userAds.ads}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item, index}) => <Item
                                            title={item.title}
                                            location={item.address}
                                            price={item.price}
                                            space={item.space}
                                            desc={item.description}
                                            image={item.image}
                                            id={item.id}
                                            index={index}
                                        />}
                                        keyExtractor={item => item.id}
                                    />

                                </View>

                            </View>

                        </View>
                        :
                        null
                }

            </Content>
        </Container>
    );
}

export default AdvertiserDetails;


