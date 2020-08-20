import React, { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import Card from '../components/Card';
import BlogTitleText from '../components/BlogTitleText';
import BlogBodyText from '../components/BlogBodyText';
import * as blogActions from '../store/actions/blogActions';
import { Actions } from 'react-native-router-flux';
import DrawerNav from '../components/DrawerNav';
import SearchBar from '../components/SearchBar';
import {buildMatchingTable, ahoCorasick } from '../search/ahoCorasick';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagesArray from '../assets/pictures/images';
import { UserLoginContext } from '../context/UserLoginContext';

const HomeScreen = React.memo(props =>{

    const [ searchTerm, setSearchTerm] = useState('');
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true);
    const { userId } = useContext(UserLoginContext);

    useEffect(()=>{
        if(props.blogs.length === 0){
            props.loadMoreData(0);
        }
        if( userId && !props.users[userId]){
            props.loadUserDetail(userId);
        }
    },[]);

    const searchTermHandler = useCallback((input)=>{
        setSearchTerm(input);
    },[]);

    const filterBlogsHandler = useMemo(()=>{

        let filteredBlog = [];

        switch(props.filterType){
            case 'fav':{
                filteredBlog = props.blogs.filter( blog => blog.isLike );
                break;
            }
            default: {
                filteredBlog = props.blogs;
            }
        }

        if(searchTerm !== ''){
            const keywords = searchTerm.toLocaleLowerCase().split(' ');
            const automata = buildMatchingTable(keywords);
            return filteredBlog.filter(blog =>{
                let { title } = blog;
                title = title.toLocaleLowerCase();
                let result = ahoCorasick(title,automata);
                return result;
            });
        }

        return filteredBlog
    },[props.blogs, props.filterType, searchTerm])

    const toggleLikeHandler = useCallback( postId => {
        props.toggleLike(postId);
    },[]);


    const renderItemHandler = ({ item }) =>{
        
        let favIcon = (
            <TouchableWithoutFeedback onPress={()=>toggleLikeHandler(item.id)}>
                <Icon name="heart-o" style={styles.icon} />
            </TouchableWithoutFeedback>
        );        
        
        if(item.isDeleted)
            return null;

        if(item.isLike){
            favIcon = (
                <TouchableWithoutFeedback onPress={()=>toggleLikeHandler(item.id)}>
                    <Icon name="heart" style={styles.likeIcon} />
                </TouchableWithoutFeedback>
            );
        }
        
        return (
            <TouchableWithoutFeedback onPress={()=>Actions.BlogDetailScreen({item})}>
                <View style={styles.cardContainer}>
                <Image 
                    source={imagesArray[item.imageSrc]} 
                    style={styles.image}
                    resizeMode='cover'
                />
                <Card style={styles.card}>
                    <BlogTitleText numberOfLines={2}>{item.title}</BlogTitleText>
                    <BlogBodyText numberOfLines={3}>{item.body}</BlogBodyText>
                </Card>
                <Card style={styles.bottomCard}>
                    {favIcon}
                </Card>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    const LoadMoreDataHandler = useCallback( ()=>{
        if(!onEndReachedCalledDuringMomentum){
            props.loadMoreData(props.start);
            // console.log('load more', props.start);
            setOnEndReachedCalledDuringMomentum(true);
        }
        if(props.end){
            ToastAndroid.show("End Reached", ToastAndroid.SHORT);
        }
        
    },[props.start, onEndReachedCalledDuringMomentum]);

    let footerContent = (
        <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );

    if(props.end || searchTerm!=='' || props.filterType){
        footerContent = null;
    }

    return (
            <DrawerNav filterType={props.filterType} username = { props.users[userId] ? props.users[userId].username : null }>
                <View style={styles.screen}>
                <SearchBar
                    value={searchTerm}
                    onChangeText={searchTermHandler}
                />
                <FlatList
                        data={filterBlogsHandler}
                        initialNumToRender={5}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={ item => item.id.toString() }
                        renderItem = {renderItemHandler}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.1}
                        onEndReached={LoadMoreDataHandler}
                        bounces={false}
                        onMomentumScrollBegin = {() => setOnEndReachedCalledDuringMomentum(false)}
                        ListFooterComponent= {footerContent}
                    />
                </View>
            </DrawerNav>
    );
})

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop: 5,
        marginHorizontal: 20
    },
    cardContainer:{
        marginBottom: 25,
    },
    image:{
        height: 180,
        width: "100%",
        overflow: 'hidden',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    card: {
        width: "100%",
        elevation: 0,
        borderRadius: 0
    },
    bottomCard:{
        paddingVertical: 5,
        elevation: 0,
        borderRadius: 0,
        borderTopColor: '#F0EEEE',
        borderTopWidth: 1,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    icon:{
        fontSize: 25,
        color: 'gray'
    },
    likeIcon:{
        fontSize: 25,
        color: '#B22222'
    },
    activityIndicator:{
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        blogs : state.blogs,
        start : state.start,
        end : state.end,
        users : state.users
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadMoreData : blogActions.loadData(dispatch),
        toggleLike : postId => dispatch(blogActions.toggleLike(postId)),
        loadUserDetail : blogActions.loadUserDetail(dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
