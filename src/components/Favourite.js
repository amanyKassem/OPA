import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, FlatList} from "react-native";
import {Container, Content, Card, Icon, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getFavourite} from "../actions";
import Header from '../common/Header';
import Build from './Build';
import COLORS from "../consts/colors";
import axios from "axios";
import CONST from "../consts";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Favourite({navigation}) {


    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);


    const favourite = useSelector(state => state.favourite.favourite);
    const favouriteLoader = useSelector(state => state.favourite.loader);


    const dispatch = useDispatch();

    function onToggleFavorite (id){
        axios({
            url         : CONST.url + 'favAndUnFavAd',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,ad_id :id }
        }).then(response => {

            fetchData();

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });
        });

    }

    function fetchData(){
        dispatch(getFavourite(lang, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , favouriteLoader]);

    function Item({ title ,location , price , image , space , desc , isFav , id, index }) {
        return (
            <Build data={{title ,location , price , image , space , desc , id, index }} isFav={isFav}
                     onToggleFavorite={() => onToggleFavorite(id)}
                     navigation={navigation}/>
        );
    }

    function renderLoader(){
        if (favouriteLoader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }
    function renderNoData() {
        if (favourite && (favourite).length <= 0) {
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

                <Header navigation={navigation} title={ i18n.t('favourite') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50, justifyContent:favourite && (favourite).length <= 0 ? 'center' : 'flex-start' }]}>

                    {
                        favourite && (favourite).length > 0?
                            <View style={[{height:height - 112}]}>

                                <FlatList
                                    data={favourite}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        location={item.address}
                                        price={item.price}
                                        space={item.space}
                                        image={item.image}
                                        desc={item.description}
                                        isFav={item.isFav}
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

export default Favourite;


