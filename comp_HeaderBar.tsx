import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchNavigationProp} from './types'; // Import SearchNavigationProp from types.tsx
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HeaderBar = ({routeToken}) => {
  // Nhận routeToken từ props
  const navigation = useNavigation<SearchNavigationProp>();

  const handleSearchPress = () => {
    navigation.navigate('Search', {token: routeToken}); // Truyền token khi điều hướng đến Search
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleSearchPress}>
        <Image
          style={styles.searchIcon}
          source={require('./assets/Search.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: hp('8%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default HeaderBar;
