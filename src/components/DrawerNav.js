import React, { useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import DrawerLayout from 'react-native-drawer-layout';
import { Actions } from "react-native-router-flux";
import SubMenu from './subMenu';
import Header from './Header';

const DrawerNav = props => {
  const drawer= useRef(DrawerLayout);

  const navigationView = (
    <View style={styles.navigationContainer}>
        <View style={styles.imageContainer}>
            <Image 
                source={require('../assets/pictures/success.png')} 
                style={styles.image}
                resizeMode='cover'
            />
        </View>
        <SubMenu title="Home" action={()=>{drawer.current.closeDrawer();Actions.homeBlog();}} name="home"/>
        <SubMenu title="Create" action={()=>{drawer.current.closeDrawer();Actions.createBlog();}} name="edit"/>
        <SubMenu title="Sign-out" action={()=>{drawer.current.closeDrawer();Actions.logOut();}} name="sign-out"/>
    </View>
  );

  return (
      <DrawerLayout
        drawerWidth={300}
        drawerPosition='left'
        renderNavigationView={() => navigationView}
        ref={drawer}
      >
        <Header iconName="navicon" title="Home" action={()=>drawer.current.openDrawer()}/>
        <View style={styles.container}>
            {props.children}
        </View>
      </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#9400D3",
    padding: 8
  },
  imageContainer:{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingVertical: 40
  },
  image:{
      alignSelf: 'center',
      width: 160,
      height: 160,
      borderRadius: 80,
      borderWidth: 1,
      borderColor: 'white'
  }
});

export default DrawerNav;