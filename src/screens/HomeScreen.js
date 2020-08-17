import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Text
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

const HomeScreen = React.memo(props =>{

    const [ searchTerm, setSearchTerm] = useState('');
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)

    useEffect(()=>{
        if(props.blogs.length === 0){
            // console.log('hello');
            props.loadMoreData(0);
        }
    },[]);

    const searchTermHandler = useCallback((input)=>{
        setSearchTerm(input);
    },[]);

    const filterBlogsHandler = useMemo(()=>{

        if(searchTerm !== ''){
            const keywords = searchTerm.toLocaleLowerCase().split(' ');
            const automata = buildMatchingTable(keywords);
            // console.log(keywords,automata);
            return props.blogs.filter(blog =>{
                let { title } = blog;
                title = title.toLocaleLowerCase();
                let result = ahoCorasick(title,automata);
                if(result)
                // console.log('title',title);
                return result;
            });
        }

        return props.blogs
    },[props.blogs,searchTerm])


    const renderItemHandler = ({ item }) =>{
        
        if(item.isDeleted)
            return null;

        return (
            <TouchableWithoutFeedback onPress={()=>Actions.BlogDetailScreen({item})}>
                <View style={styles.cardContainer}>
                <Image 
                    source={require('../assets/pictures/success.png')} 
                    style={styles.image}
                    resizeMode='cover'
                />
                <Card style={styles.card}>
                    <BlogTitleText>{item.title}</BlogTitleText>
                    <BlogBodyText>{item.body}</BlogBodyText>
                </Card>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    const LoadMoreDataHandler = useCallback( ()=>{
        // console.log(onEndReachedCalledDuringMomentum);
        if(!onEndReachedCalledDuringMomentum){
            props.loadMoreData(props.start);
            // console.log('load more', props.start);
            setOnEndReachedCalledDuringMomentum(true);
        }
        
    },[props.start, onEndReachedCalledDuringMomentum]);

    return (
            <DrawerNav>
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
                        // ListFooterComponent= {<Text>end </Text>}
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    card: {
        width: "100%",
        elevation: 0,
        borderRadius: 0
    }
});

const mapStateToProps = state => {
    return {
        blogs : state.blogs,
        start : state.start
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadMoreData : blogActions.loadData(dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);
