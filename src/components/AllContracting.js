import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, FlatList, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getContractingCategories} from "../actions";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AllContracting({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const contractingCat = useSelector(state => state.contractingCat.contractingCat);
    const contractingCatLoader = useSelector(state => state.contractingCat.loader);


    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getContractingCategories(lang , null, token));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , contractingCatLoader ]);

    function renderLoader(){
        if (contractingCatLoader === false ){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (contractingCat && (contractingCat).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }



    function Item({ title , icon , id , type, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('realEstateComp',{category_id:id , type, title})} style={[styles.height_130,styles.marginBottom_10 , styles.marginHorizontal_5, {flex:1}]}>
                <View style={[styles.imgOverLay]}/>
                <View style={[styles.flexCenter , styles.heightFull,{position:'absolute' , top :0,zIndex:1}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{title}</Text>
                    {/*<Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{desc}</Text>*/}
                </View>
                <Image source={{uri:icon}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
            </TouchableOpacity>
        );
    }


    return (
        <Container>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('allContracting') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    {renderNoData()}

                    <View style={[{height:height - 100,paddingBottom:10}]}>
                        {
                            contractingCat ?
                                <FlatList
                                    data={contractingCat}
                                    horizontal={false}
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item , index}) => <Item
                                        title={item.title}
                                        icon={item.icon}
                                        id={item.id}
                                        type={item.type}
                                        index={index}
                                    />}
                                    keyExtractor={item => item.id}
                                    columnWrapperStyle={[styles.directionRowCenter]}
                                />
                                :
                                null

                        }


                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default AllContracting;


