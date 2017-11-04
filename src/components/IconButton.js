import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  icon: {
    color: '#999',
    fontSize: 20,
    margin: 5,
  },
});

class IconButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={this.props.disabled ? null : this.props.onPress}
      >
        <Icon
          name={this.props.name}
          style={[styles.icon, { color: this.props.disabled ? 'gray' : 'blue' }]}
        />
      </TouchableOpacity>
    );
  }
}

export default IconButton;
