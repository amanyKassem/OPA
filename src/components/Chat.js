import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,FlatList} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Chat({navigation}) {

    const flatListRef = useRef();
    const [text, setText] = useState('');
    const notifications = [
        {id:'0' , sender_id:'0' , time :'03:00' , body:'مساء الخير'},
        {id:'1' , sender_id:'1' , time :'03:05' , body:'مساء النور .. اخبارك ايه و العيله و بابا و ماما و ناهد و كلنا'},
        {id:'2' , sender_id:'0' , time :'03:10' , body:'احنا زي الفل و 100 قشطه'},
        {id:'3' , sender_id:'1' , time :'03:15' , body:'طب الحمدلله طمنتني عليكم'},
        {id:'4' , sender_id:'0' , time :'03:20' , body:'بيقولك ابوك لقي اثاااار مدفونه في الارض'},
        {id:'5' , sender_id:'1' , time :'03:25' , body:'دهب ؟؟؟؟؟!!!!!!'},
        {id:'6' , sender_id:'0' , time :'03:30' , body:'ايوه دهب'},
        {id:'7' , sender_id:'1' , time :'03:35' , body:'يعني ايه !!!'},
        {id:'8' , sender_id:'1' , time :'03:35' , body:'يعني هبقي غني ؟'},
        {id:'9' , sender_id:'0' , time :'03:40' , body:'ايوه هتبقي غني'},
        {id:'10' , sender_id:'1' , time :'03:05' , body:'وااااااه يا غزاااااااالي'},
    ];

    useEffect(() => {
        let endIndex = notifications.length - 1;
        setTimeout(() => flatListRef.current.scrollToIndex({animated: true, index: endIndex}),500);
    }, []);

    const getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
    );

    function Item({ title ,body , time , id , sender_id, index }) {
        if(sender_id == 1){
            return (
                <View style={[styles.marginBottom_7]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12, styles.SelfCenter , styles.marginBottom_7 ]}>{time}</Text>
                    <View style={[styles.directionBasicRow,styles.alignEnd]}>
                        <View style={[styles.chatCard ,{ backgroundColor: COLORS.orange, borderTopRightRadius:0 , maxWidth:width-85}]}>
                            <Text style={[styles.textRegular , styles.text_black , styles.textSize_12, styles.alignStart ,
                                {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{body}</Text>
                        </View>
                        <View style={[styles.borderMstarda, styles.icon40, styles.Radius_50 ,{borderColor: COLORS.green , marginLeft:5}]}>
                            <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull, styles.Radius_50]} resizeMode={'cover'} />
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style={[styles.marginBottom_7]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_12, styles.SelfCenter , styles.marginBottom_7 ]}>{time}</Text>
                <View style={[styles.chatCard , styles.alignStart ,{ backgroundColor: COLORS.green, borderBottomLeftRadius:0}]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_12 ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{body}</Text>
                </View>
            </View>
        );
    }

    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('chat') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_20,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[{height:height - 170}]}>

                        <FlatList
                            data={notifications}
                            ref={flatListRef}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                body={item.body}
                                time={item.time}
                                sender_id={item.sender_id}
                                id={item.id}
                                index={index}
                            />}
                            keyExtractor={item => item.id}
                            getItemLayout={getItemLayout}
                            // onContentSizeChange={()=> flatListRef.scrollToEnd({animated: true})}
                             // extraData={selected}
                        />

                    </View>

                    <View style={[styles.directionRow , styles.marginTop_10]}>
                        <Input style={[styles.searchInput]}
                               onChangeText={(text) => setText(text)}
                        />
                        <TouchableOpacity style={[{marginLeft:10}]}>
                            <Image source={require('../../assets/images/send.png')} style={[styles.icon40]} resizeMode={'cover'} />
                        </TouchableOpacity>
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Chat;


