import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import * as ColorsApp from 'themes/colors';
import * as Colors from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: ColorsApp.white,
    borderBottomWidth: 1,
    borderColor: ColorsApp.nearWhite,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  option: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

class ColorPalette extends React.Component {
  getBorderColor(color) {
    const { selected } = this.props;
    return color === this.props.selected ? ColorsApp.primary : color;
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
