import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Vibration,
    I18nManager,
    FlatList, ActivityIndicator
} from "react-native";
import {Container, Content, Card, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import COLORS from "../consts/colors";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import {getHomeAds} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function SearchByList({navigation}) {

    const [search, setSearch] = useState('');
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const homeAds = useSelector(state => state.homeAds.homeAds);
    const homeAdsLoader = useSelector(state => state.homeAds.loader);

    const dispatch = useDispatch();

    const fetchData = async () => {

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            dispatch(getHomeAds(lang , latitude ,longitude , null , token))
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += userLocation.latitude + ',' + userLocation.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log("getCity  " , getCity)
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', e => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , homeAdsLoader]);

    function Item({ title ,location , price , img , space , hall , rooms , bathroom , image , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('listDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.mstarda : COLORS.orange, minHeight:100}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 , styles.alignStart]}>{ space }</Text>
                    {
                        rooms && hall && bathroom ?
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}> { rooms ? rooms + ' -' : null} {hall ? hall + ' -' : null} {bathroom}</Text>
                            :
                            null
                    }
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderLoader(){
        if (homeAdsLoader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (homeAds && (homeAds).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }

    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('searchByList') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_10,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                   <View>
                       <Input style={[styles.inputSearch , styles.Width_100, styles.bg_White , {flex:0}]}
                              placeholder={i18n.t('search')}
                              placeholderTextColor={COLORS.lightGray}
                              onChangeText={(search) => setSearch(search)}
                              value={search}
                       />

                       <View style={[styles.directionRow , {position:'absolute' , right:15 , top:13}]}>
                           <TouchableOpacity onPress={() => navigation.push('searchResults' , {keyword:search})}>
                               <Image source={require("../../assets/images/search.png")} style={[styles.icon20]} resizeMode={'cover'} />
                           </TouchableOpacity>
                           <View style={[styles.height_20 ,styles.marginHorizontal_7 , {width:.5 ,  backgroundColor: COLORS.midGray}]}/>
                           <TouchableOpacity onPress={() => navigation.navigate('advancedSearch')}>
                               <Image source={require("../../assets/images/filter.png")} style={[styles.icon20]} resizeMode={'cover'} />
                           </TouchableOpacity>
                       </View>
                   </View>


                    {
                        homeAds && (homeAds).length > 0?

                            <View style={[{height:height - 220} , styles.marginTop_10]}>

                                <FlatList
                                    data={homeAds}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        location={item.address}
                                        price={item.price}
                                        space={item.space}
                                        rooms={item.rooms}
                                        hall={item.hall}
                                        bathroom={item.bathroom}
                                        image={item.image}
                                        id={item.id}
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

export default SearchByList;


