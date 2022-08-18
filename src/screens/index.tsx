import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useInfiniteQuery, useQuery} from 'react-query';
import DukanCart from './Cartstore';
const StoreProduct = ({product, onCLick}) => {
  const addToCart = DukanCart(state => state.addToCart);
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
          <Text style={styles.price}>{product.stats.average_price}</Text>
          <Button title='Add to Cart' onPress={() => addToCart(product)}></Button>
        </View>
      </View>
    </View>
  );
};

const Home = ({navigation}) => {
  const [data1, setData] = useState([]);
  let index = useRef({start: 0, end: 10});

  const onCLick = () => {
    navigation.navigate('Cart');
  };

  const getData = index => {
    return axios.get(
      'https://api.opensea.io/api/v1/collections?offset=' +
        index.current.start +
        '&limit=' +
        index.current.end,
    );
  };

  const {isLoading, error, fetchNextPage} = useInfiniteQuery('get-all-data', () => getData(index), {
    onSuccess: data => {
      setData([...data1,...data.pages[data.pages.length-1].data.collections]);
    },
    getNextPageParam: () => {
      index.current.start = index.current.start + 10;
      index.current.end = index.current.end + 10;
      return index;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data1}
        onEndReachedThreshold={0}
        onEndReached={fetchNextPage}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <StoreProduct product={item} onCLick={onCLick} />
        )}
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

export default Home;
