import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import * as Colors from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  option: {
    width: Platform.OS === 'ios' ? 25 : 20,
    height: Platform.OS === 'ios' ? 25 : 20,
    borderRadius: Platform.OS === 'ios' ? 12.5 : 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

class ColorPalette extends React.Component {
  getBorderColor(color) {
    const { selected } = this.props;
    return color === this.props.selected ? 'black' : color;
  }

  renderOptions() {
    const allColors = Object.keys(Colors);

    return allColors.map(color => (
      <TouchableOpacity
        key={color}
        style={[styles.option, {
          backgroundColor: Colors[color],
          borderColor: this.getBorderColor(Colors[color]),
          borderWidth: 1,
        }]}
        onPress={() => this.props.onPress(Colors[color])}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderOptions()}
      </View>
    );
  }
}

export default ColorPalette;
