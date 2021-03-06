import React, { useState } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MainLayout } from '../screens';
import {
  constants,
  dummyData,
  icons,
  SIZES,
  FONTS,
  COLORS,
} from '../constants';
import Animated from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: COLORS.white }}
      />

      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation }) => {
  const disptch = useDispatch();
  const { selectedTab } = useSelector((state) => state.tabReducer);

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{ height: 35, width: 35, tintColor: COLORS.white }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ flexDirection: 'row', marginTop: SIZES.radius }}
          onPress={() => console.log('profile screen')}
        >
          <Image
            source={dummyData.myProfile?.profile_image}
            style={{ height: 50, width: 50, borderRadius: SIZES.radius }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              View Your Profile
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.home}
            label={constants.screens.home}
            icon={icons.home}
            onPress={() => {
              disptch(setSelectedTab(constants.screens.home));
              navigation.navigate(constants.screens.main_layout);
            }}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.wallet}
            label={constants.screens.wallet}
            icon={icons.wallet}
            onPress={() => {
              disptch(setSelectedTab(constants.screens.wallet));
              navigation.navigate(constants.screens.wallet);
            }}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.notification}
            label={constants.screens.notification}
            icon={icons.notification}
            onPress={() => {
              disptch(setSelectedTab(constants.screens.notification));
              navigation.navigate(constants.screens.notification);
            }}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.favourite}
            label={constants.screens.favourite}
            icon={icons.favourite}
            onPress={() => {
              disptch(setSelectedTab(constants.screens.favourite));
              navigation.navigate(constants.screens.favourite);
            }}
          />

          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />
          <CustomDrawerItem label="Track Your Order" icon={icons.location} />
          <CustomDrawerItem label="Coupons" icon={icons.coupon} />
          <CustomDrawerItem label="Settings" icon={icons.setting} />
          <CustomDrawerItem label="Invite a Friend" icon={icons.profile} />
          <CustomDrawerItem label="Help Center" icon={icons.help} />
        </View>

        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label="Logout" icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{
          flex: 1,
          width: '60%',
          paddingRight: 20,
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName="MainLayout"
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen name="MainLayout">
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
