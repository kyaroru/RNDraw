import React from 'react';
import {
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 3,
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    margin: 10,
    marginRight: 0,
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
});

class ResultImage extends React.Component {
  renderImage = (image, index) => {
    if (image !== null) {
      const uri = `data:image/png;base64,${image}`;
      return (
        <View key={`image-${index}`}>
          <Image
            source={{ uri }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.iconLeft} onPress={() => this.props.saveImageToDevice(uri)}>
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
      >
        {this.renderImages()}
      </ScrollView>
    );
  }
}

export default ResultImage;
