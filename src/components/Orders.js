import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Vibration,
    ActivityIndicator,
    I18nManager, FlatList
} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersResults} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Orders({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const ordersResults = useSelector(state => state.ordersResults.ordersResults);
    const ordersResultsLoader = useSelector(state => state.ordersResults.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getOrdersResults(lang, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , ordersResultsLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [ordersResults]);

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
        if (ordersResults && (ordersResults).length <= 0) {
            return (
                <TouchableOpacity style={[styles.flexCenter]} onPress={() => navigation.navigate('contracting')}>
                    <Image source={require('../../assets/images/no_notifcation.png')} style={[styles.icon150 , styles.marginBottom_25 ]} resizeMode={'contain'} />
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_10 , styles.textCenter]}>{ i18n.t('noNotifications') }</Text>
                </TouchableOpacity>
            );
        }

        return null
    }


    function Item({ title ,ad_id, id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails', {ad_id:ad_id})} style={[styles.notiCard ,styles.marginBottom_10 , styles.paddingVertical_15,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <View style={[styles.paddingHorizontal_15 , styles.directionColumnC, {flex:1}]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14,styles.marginBottom_5, styles.alignStart ]}>{ title }</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('orders') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_20,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    {renderNoData()}

                    {
                        ordersResults ?

                            <View style={[{height:height - 115}]}>

                                <FlatList
                                    data={ordersResults}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        id={item.id}
                                        ad_id={item.ad_id}
                                        index={index}
                                    />}
                                    keyExtractor={item => item.id}
                                />

                            </View>
                            :
                            null
                    }



                </View>

            </Content>
        </Container>
    );
}

export default Orders;


