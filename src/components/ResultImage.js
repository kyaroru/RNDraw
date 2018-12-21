import React from 'react';
import {
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  CameraRoll,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewShot from 'react-native-view-shot';
import { alert } from 'utils/alert';
import * as Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 3,
  },
  imageContainer: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: Colors.primary,
    margin: 10,
    marginRight: 0,
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 20,
    margin: 5,
    color: '#c6c6c6',
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  scrollView:{
    paddingRight: 10,
  }
});

class ResultImage extends React.Component {
  saveImageToDevice = async (data) => {
    if (Platform.OS === 'android') {
      this.refs.viewShot.capture().then(uri => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((isGranted) => {
          if (isGranted) {
            CameraRoll.saveToCameraRoll(uri).then((result) => {
              // result contain actual uri of the image after saved
              alert('Success', 'Your drawing has been saved to device');
            });
          }
        });
      });
    } else {
      CameraRoll.saveToCameraRoll(data, 'photo').then((result) => {
        // result contain actual uri of the image after saved
        alert('Success', 'Your drawing has been saved to device');
      });
    }
  }

  renderImage = (image, index) => {
    if (image !== null) {
      const uri = `data:image/png;base64,${image}`;
      return (
        <View key={`image-${index}`}>
          <View style={styles.imageContainer}>
            <ViewShot ref="viewShot" options={{ format: "png", quality: 1 }}>
              <Image
                source={{ uri }}
                style={styles.image}
              />
            </ViewShot>
          </View>
          <TouchableOpacity style={styles.iconLeft} onPress={() => this.saveImageToDevice(uri)}>
              <Icon
                name="save"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconRight} onPress={() => this.props.removeImage(image)}>
              <Icon
                name="trash"
                style={styles.icon}
              />
            </TouchableOpacity>
        </View>
      );
    }

    return null;
  }

  renderImages() {
    const { images } = this.props;
    if (images.length > 0) {
      return images.map((image, index) => this.renderImage(image, index));
    }
    return null;
  }

  render() {
    return (
      <ScrollView
        directionalLockEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {this.renderImages()}
      </ScrollView>
    );
  }
}

export default ResultImage;
