import React, { Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import Actions from 'actions';
import { connect } from 'react-redux';
import DrawBoard from './components/DrawBoard';
import ResultImage from './components/ResultImage';
import Header from './components/Header';
import ColorPalette from './components/ColorPalette';

class App extends Component {
  constructor() {
    super();

    this.state = {
      result: null,
      color: 'black',
      strokeWidth: 4,
    };

    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAddPath = this.onAddPath.bind(this);
  }

  onCancel = () => {
    this.props.resetPath();
    this.setState({ result: null });
  }

  onUndo = () => {
    this.props.undoPath();
  }

  onRedo = () => {
    this.props.redoPath();
  }

  onAddPath = (path, svgView) => {
    this.props.addPath(path);
    this.svgView = svgView;
  }

  onChangeColor = (color) => {
    this.setState({ color });
  }

  onSave = async () => {
    const onComplete = (result) => {
      this.setState({ result });
    };
    this.svgView.toDataURL(onComplete);
  }

  isUndoDisabled = () => {
    const { currentStep } = this.props;
    if (currentStep <= 0) {
      return true;
    }
    return false;
  }

  isRedoDisabled = () => {
    const { currentStep, paths } = this.props;
    if (currentStep >= paths.length) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        <Header
          save={this.onSave}
          undo={this.onUndo}
          isUndoDisabled={this.isUndoDisabled()}
          redo={this.onRedo}
          isRedoDisabled={this.isRedoDisabled()}
          cancel={this.onCancel}
        />
        <ColorPalette onPress={this.onChangeColor} />
        <View style={{ alignItems: 'center' }}>
          <DrawBoard
            ref={(view) => { this.drawBoard = view; }}
            donePaths={this.props.displayPaths}
            addPath={this.onAddPath}
            containerStyle={{ backgroundColor: '#FFF', marginTop: 10 }}
            width={Dimensions.get('window').width - 20}
            height={Dimensions.get('window').width - 20}
            color={this.state.color}
            strokeWidth={this.state.strokeWidth}
          />
        </View>
        <ResultImage image={this.state.result} />
      </View>
    );
  }
}

App.propTypes = {
};

const mapStateToProps = store => ({
  displayPaths: Actions.getDisplayPaths(store),
  paths: Actions.getActualPaths(store),
  currentStep: Actions.getCurrentStep(store),
});

const mapDispatchToProps = {
  addPath: Actions.addPath,
  resetPath: Actions.resetPath,
  undoPath: Actions.undoPath,
  redoPath: Actions.redoPath,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
