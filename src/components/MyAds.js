import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, FlatList, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getAuthUserAds} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function MyAds({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);


    const authUserAds = useSelector(state => state.authUserAds.authUserAds);
    const authUserAdsLoader = useSelector(state => state.authUserAds.loader);


    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getAuthUserAds(lang, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , authUserAdsLoader]);


    function Item({ title ,location , price , img , space , desc , image , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('adDetails' , {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_green , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_orange , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ desc.substr(0,30) }..</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderLoader(){
        if (authUserAdsLoader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }
    function renderNoData() {
        if (authUserAds && (authUserAds).length <= 0) {
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
        <Container>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('myAds') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <TouchableOpacity onPress={() => navigation.navigate('addAdTerms')} style={[styles.babyblueBtn , styles.Width_80, styles.SelfCenter ]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('addAd') }</Text>
                    </TouchableOpacity>

                    {renderNoData()}

                    <View style={[{height:height - 182} , styles.marginTop_25]}>

                        <FlatList
                            data={authUserAds}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
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

            </Content>
        </Container>
    );
}

export default MyAds;


