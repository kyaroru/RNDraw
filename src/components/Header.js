import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#EEE',
    paddingTop: 18,
    paddingBottom: 5,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 3,
  },

  title: {
    color: '#444',
    fontSize: 20,
    fontWeight: '900',
    marginRight: 20,
  },
});

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Text style={styles.title}>
            RNDraw
          </Text>
          <IconButton
            onPress={this.props.undo}
            name="arrow-left"
            disabled={this.props.isUndoDisabled}
          />
          <IconButton
            onPress={this.props.redo}
            name="arrow-right"
            disabled={this.props.isRedoDisabled}
          />
          <IconButton
            onPress={this.props.save}
            name="check"
          />
          <IconButton
            onPress={this.props.cancel}
            name="remove"
          />
        </View>
      </View>
    );
  }
}

export default Header;
