import React, { Component } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Reaction from './Reaction';

const styles = StyleSheet.create({
  drawContainer: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  drawSurface: {
    backgroundColor: 'transparent',
  },
});

export default class DrawBoard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentMax: 0,
      currentPoints: [],
      reaction: new Reaction(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gs) => true,
      onMoveShouldSetPanResponder: (evt, gs) => true,
      onPanResponderGrant: (evt, gs) => this.onResponderGrant(evt, gs),
      onPanResponderMove: (evt, gs) => this.onResponderMove(evt, gs),
      onPanResponderRelease: (evt, gs) => this.onResponderRelease(evt, gs),
    });
  }

  onTouch(evt) {
    const [x, y] = [evt.nativeEvent.pageX, evt.nativeEvent.pageY];
    const newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({ x, y });

    this.setState({
      currentPoints: newCurrentPoints,
      currentMax: this.state.currentMax,
    });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
  }

  onResponderRelease() {
    let path;
    if (this.state.currentPoints.length > 0) {
      path = (<Path
        key={this.state.currentMax}
        d={this.state.reaction.pointsToSvg(this.state.currentPoints)}
        stroke={this.props.color}
        strokeWidth={this.props.strokeWidth}
        fill="none"
      />);
    }

    this.state.reaction.addGesture(this.state.currentPoints);

    this.setState({
      currentPoints: [],
      currentMax: this.state.currentMax + 1,
    });

    this.props.addPath(path, this.svgView);
  }

  onLayoutContainer = (e) => {
    this.state.reaction.setOffset(e.nativeEvent.layout);
  }

  render() {
    return (
      <View
        onLayout={this.onLayoutContainer}
        style={[
          styles.drawContainer,
          this.props.containerStyle,
          { width: this.props.width, height: this.props.height },
        ]}
      >

        <View {...this.panResponder.panHandlers}>
          <Svg
            style={styles.drawSurface}
            width={this.props.width}
            height={this.props.height}
            ref={(view) => { this.svgView = view; }}
          >
            <G>
              {this.props.donePaths}
              <Path
                key={this.state.currentMax}
                d={this.state.reaction.pointsToSvg(this.state.currentPoints)}
                stroke={this.props.color}
                strokeWidth={this.props.strokeWidth - 1}
                strokeOpacity={0.5}
                fill="none"
              />
            </G>
          </Svg>
        </View>
      </View>
    );
  }
}
