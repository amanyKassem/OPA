import React , {useEffect , useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, FlatList , ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getSearch} from "../actions";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function SearchResults({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const keyword = route.params.keyword;
    const Latitude = route.params.Latitude;
    const Longitude = route.params.Longitude;
    const category_id = route.params.category_id;
    const rent_id = route.params.rent_id;
    const min_space = route.params.min_space;
    const max_space = route.params.max_space;
    const min_price = route.params.min_price;
    const max_price = route.params.max_price;

    const searchResult = useSelector(state => state.search.search);

    const [screenLoader , setScreenLoader ] = useState(true);
    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getSearch(lang ,
            keyword? keyword : null ,
            Latitude ? Latitude :null ,
            Longitude? Longitude: null ,
            category_id ? category_id : null ,
            rent_id ? rent_id :null ,
            min_space ? min_space :null ,
            max_space ? max_space :null ,
            min_price ? min_price :null,
            max_price ? max_price :null ,
            token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        setScreenLoader(false)
    }, [searchResult]);

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function Item({ title ,location , price , space , desc , image , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('listDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 ,styles.alignStart]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 ,styles.alignStart]}>{ desc.substr(0,30) }..</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderNoData() {
        if (searchResult && (searchResult).length <= 0) {
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

                <Header navigation={navigation} title={ i18n.t('searchResults') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50, justifyContent:searchResult && (searchResult).length <= 0 ? 'center' : 'flex-start' }]}>

                    {
                        searchResult && (searchResult).length > 0?
                            <View style={[{height:height - 100}]}>

                                <FlatList
                                    data={searchResult}
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
                            :
                            renderNoData()
                    }


                </View>

            </Content>
        </Container>
    );
}

export default SearchResults;


