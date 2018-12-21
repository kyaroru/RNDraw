import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import IconButton from './IconButton';
import * as Colors from 'themes/colors';

const {
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
export const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 45;
export const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.primary,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 20,
  },
});

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} />
        <View style={styles.statusBar} />
        <View style={[styles.navBar, styles.buttonsContainer]}>
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
            disabled={this.props.isSaveDisabled}
          />
          <IconButton
            onPress={this.props.cancel}
            name="remove"
          />
          {Platform.OS === 'android' && <IconButton
            onPress={this.props.setting}
            name="cogs"
          />}
        </View>
      </View>
    );
  }
}

export default Header;
