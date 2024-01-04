import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import HotelCard from './components/HotelCard';
import ArrowIcon from './assets/arrowicon.png';
import FilterIcon from './assets/filtericon.png';

const { width, height } = Dimensions.get('window');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      hotels: [],
      page: 1,
      pageSize: 5,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadHotels();
  }

  loadHotels = () => {
    const { hotels, page, pageSize } = this.state;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    this.setState({ isLoading: true });

    axios.get('https://gist.githubusercontent.com/yasaricli/de2282f01c739a5c8fcbffbb9116e277/raw/949b2393642747d2f54edf0ce659f27a69c87690/hotels.json')
      .then(response => {
        const newHotels = response.data.resultObject.hotelList.slice(startIndex, endIndex);

        this.setState(prevState => ({
          hotels: [...prevState.hotels, ...newHotels],
          isLoading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }), () => {
        this.loadHotels();
      });
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.loadingFooter}>
        {this.state.isLoading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="green" />}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.topHeader}>Antalya</Text>
          <Text style={styles.topTwoHeader}>18 Şub - 23 Şub, 2 Yetişkin</Text>

        </View>
        <View style={styles.topTwoContainer}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ArrowIcon}
              style={styles.image}
            />
            <Text style={styles.topHeaderTwoDescription}>Sırala</Text>

          </TouchableOpacity>
          <View style={styles.verticalLine} />

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={FilterIcon}
              style={styles.image}
            />
            <Text style={styles.topHeaderTwoDescription}>Filtrele</Text>

          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.hotels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <HotelCard
              hotelName={item.hotelName}
              customerScore={item.customerScore}
              location={item.location}
              areaName={item.areaName}
              subAreaName={item.subAreaName}
              subAreaDetailName={item.subAreaDetailName}
              photoPath={item.photoPath}
              accommodation={item.accommodation}
              campaignName={item.campaignName}
              discountPrice={item.discountPrice}
            />
          )}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C4C4C4',
  },
  topContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10
  },
  topTwoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: height * 0.01,
    marginTop: height * 0.005
  },
  loadingFooter: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHeader: {
    fontSize: width * 0.04,
    color: 'black',
    fontWeight: 'bold'
  },
  topTwoHeader: {
    fontSize: width * 0.03,
    color: 'black',
  },
  topHeaderDescription: {
    fontSize: width * 0.03,
    padding: height * 0.008
  },

  topHeaderTwoDescription: {
    color: '#7FC7D9',
    fontWeight: 'bold',
    fontSize: width * 0.034,
    padding: 4
  },
  verticalLine: {
    height: height * 0.025,
    width: width * 0.002,  // 1 piksellik çizgi
    backgroundColor: 'gray',
  },
  image: {
    width: width * 0.033,
    height: width * 0.033,

  }
});
