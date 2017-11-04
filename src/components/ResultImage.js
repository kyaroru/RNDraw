import React from 'react';
import {
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from 'react-native';

class ResultImage extends React.Component {
  saveImage = async (uri) => {
    const result = await CameraRoll.saveToCameraRoll(uri);
    console.log(result);
  }

  renderResult = () => {
    if (this.props.image !== null) {
      const uri = `data:image/png;base64,${this.props.image}`;
      return (
        <TouchableOpacity key="image" onPress={() => this.saveImage(uri)}>
          <Image
            source={{ uri }}
            style={styles.image}
          />
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    return (
      <ScrollView
        directionalLockEnabled
        horizontal
      >
        {this.renderResult()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
});

export default ResultImage;
