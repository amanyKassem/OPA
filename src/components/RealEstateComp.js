import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, FlatList, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryConstructions} from "../actions";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function RealEstateComp({navigation , route}) {

    const category_id = route.params.category_id;
    const type = route.params.type;
    const title = route.params.title;

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const categoryConstructions = useSelector(state => state.categoryConstructions.categoryConstructions);
    const categoryConstructionsLoader = useSelector(state => state.categoryConstructions.loader);


    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getCategoryConstructions(lang , category_id , type, token));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , categoryConstructionsLoader ]);

    function renderLoader(){
        if (categoryConstructionsLoader === false ){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (categoryConstructions && (categoryConstructions).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }


    function Item({ website , icon , title , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('realEstateDet',{id})} style={[styles.height_130,styles.marginBottom_10 , {flex:1}]}>
                <View style={[styles.imgOverLay]}/>
                <View style={[styles.alignStart,{position:'absolute' , bottom :10 ,left:15,zIndex:1}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter , styles.alignStart ]}>{title}</Text>
                    <View style={[styles.directionRow]}>
                        <Image source={require("../../assets/images/white_global.png")} style={[styles.icon15 , {marginRight:5}]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{website}</Text>
                    </View>
                </View>
                <Image source={{uri:icon}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
            </TouchableOpacity>
        );
    }


    return (
        <Container>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={title}/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50, justifyContent:categoryConstructions && (categoryConstructions).length <= 0 ? 'center' : 'flex-start' }]}>

                    {
                        categoryConstructions && (categoryConstructions).length  > 0?
                            <View style={[{height:height - 100,paddingBottom:10}]}>

                                <FlatList
                                    data={categoryConstructions}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        website={item.website}
                                        icon={item.icon}
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

export default RealEstateComp;


