import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/index';
import {Cart} from './src/screens/Cart';
import {QueryClientProvider, QueryClient} from 'react-query';
import DukanCart from './src/screens/Cartstore';
import {Header} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={({navigation}) => ({
                headerLeft: () => (
                  <Image
                    source={require('./src/components/Images/ShopName.png')}
                    style={styles.image}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.image}>
                    <Image
                      style={styles.image}
                      source={require('./src/components/Images/Cart.webp')}
                    />
                  </TouchableOpacity>
                ),
                headerTitle: () => (
                  <Text style={styles.image1} >APNI DUKAN</Text>
                ),
              })}
            />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
  image1: {
    width: 150,
    height: 50,
    marginLeft: 50,
    paddingTop: 20,
    fontSize: 17,
    color: 'orange',
    fontWeight: '500',
  },
});

export default App;
