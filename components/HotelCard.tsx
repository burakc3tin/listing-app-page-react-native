import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { Component } from 'react';
import MapPointerImage from '../assets/mappointer.png';
import PercentImage from '../assets/percentimage.png';
import VirusImage from '../assets/virusimage.png';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class HotelCard extends Component {


  constructor() {
    super();
    this.state = {
      number1: '',
    };
  }

  render() {
    const { hotelName, customerScore, areaName, subAreaName, subAreaDetailName, photoPath, accommodation, campaignName, discountPrice } = this.props;

    const numberAsString = discountPrice.toString();
    const firstThreeDigits = numberAsString.slice(0, 3);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: photoPath }}
          style={styles.image}
          imageStyle={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
          <TouchableOpacity style={styles.hotelPoint}>
            <Text style={styles.hotelPointText}>{customerScore}</Text>
          </TouchableOpacity>
          <View style={styles.imageDescription}>
            <Text style={styles.imageDescriptionText}>
              <Image
                source={VirusImage}
                style={styles.virusImage}
              />
              Sağlık Sertifikalı</Text>
          </View>
        </ImageBackground>

        <View style={styles.mainContainer}>
          <View style={styles.paddingEdit}>
            <Text style={styles.header}>{hotelName}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={MapPointerImage}
                style={styles.pointerIconImage}
              />
              <Text style={styles.descriptionContainerText}>{areaName}-{subAreaName},{subAreaDetailName}</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#7FC7D9' }}>₺<Text style={{ fontWeight: 'bold', fontSize: height * 0.025 }}>{firstThreeDigits}</Text>,00</Text>
              <Text style={styles.grayText}>gecelik kişi başı</Text>

            </View>
          </View>
          <View style={[styles.descriptionContainer, { paddingBottom: 10 }]}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{accommodation}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.percentContainer}>
            <Image
              source={PercentImage}
              style={styles.percentImage} />
            <Text style={styles.percentText}>
              {campaignName}
            </Text>
          </View>
        </View>
      </View>
    )
  }


} const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    margin: 10,
    marginBottom: height * 0.020,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  hotelPoint: {
    alignItems: 'flex-end',
    padding: 10,
  },
  hotelPointText: {
    color: 'white',
    backgroundColor: 'green',
    padding: width * 0.02,
    borderRadius: 10
  },
  image: {
    display: 'flex',
    width: width * 0.95,
    height: height * 0.25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageDescription: {
    position: 'absolute',
    bottom: height * 0.015,
    left: height * 0.013,
    backgroundColor: '#63d990',
    color: 'white',
    paddingBottom: width * 0.017,
    paddingRight: width * 0.017,
    paddingLeft: width * 0.017,

    textAlign: 'center',
  },
  imageDescriptionText: {
    color: 'white',
    fontSize: width * 0.025,
    letterSpacing: 1,
  },
  pointerIconImage: {
    width: width * 0.03,
    height: height * 0.03,
  },
  header: {
    fontSize: height * 0.023,
    fontWeight: 'bold',
    color: 'black'
  },
  mainContainer: {
    padding: 10,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descriptionContainerText: {
    color: 'gray',
    fontSize: height * 0.016,
    padding: 5
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    width: width * 0.30,
    borderRadius: 4,
    padding: width * 0.006
  },
  buttonText: {
    fontSize: height * 0.016,
    color: 'black'
  },
  grayText: {
    color: 'gray'
  },
  percentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  percentImage: {
    width: 20,
    height: 20,
  },
  virusImage: {
    width: 18,
    height: 18,

  },
  percentText: {
    color: '#63d990',
    fontSize: width * 0.03,
    paddingBottom: 5,
    paddingTop: 3,
    paddingLeft: 5
  },
  paddingEdit: {
    paddingBottom: 5
  }
});