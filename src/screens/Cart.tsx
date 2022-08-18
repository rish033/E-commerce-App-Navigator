import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import DukanCart from './Cartstore';

const StoreProduct = ({product}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.div}>
          <Image
            style={styles.image2}
            source={{
              uri: product.image_url,
            }}
          />
          <Text style={styles.prod}>{product.name}</Text>
          <Text style={styles.price}>{product?.stats?.average_price}</Text>
          <Text style={styles.price}>Quantity - {product.quantity}</Text>
        </View>
      </View>
    </View>
  );
};

export const Cart = () => {
  const ProdsinCart = DukanCart(state => state.ProdsinCart);
  return (
    <View>
      <FlatList
        data={ProdsinCart}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => <StoreProduct product={item} />}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    textAlign: 'center',
    margin: -40,
    fontSize: 25,
    color: 'orange',
  },
  image1: {
    width: 50,
    height: 50,
    alignSelf: 'space-around',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  div: {
    display: 'flex',
    borderWidth: 1,
    marginLeft: 17,
    marginTop: 20,
    paddingBottom: 10,
    width: 170,
    backgroundColor: 'white',
  },
  image2: {
    width: 120,
    height: 120,
    margin: 20,
  },
  prod: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: -20,
  },
  price: {
    fontSize: 13,
    color: 'orange',
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {Cart};
