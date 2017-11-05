import React, { Component } from 'react';
import {
  View,
  Dimensions,
  CameraRoll,
  Platform,
} from 'react-native';
import Actions from 'actions';
import { connect } from 'react-redux';
import * as Colors from 'utils/colors';
import { alert, confirmation } from 'utils/alert';
import DrawBoard from './components/DrawBoard';
import ResultImage from './components/ResultImage';
import Header from './components/Header';
import ColorPalette from './components/ColorPalette';

class App extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      color: Colors.color13,
      strokeWidth: 4,
    };

    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onAddPath = this.onAddPath.bind(this);
  }

  onCancel = () => {
    const onComplete = () => {
      this.props.resetPath();
      this.setState({ results: [] });
    };
    confirmation('Hmm', 'Confirm Clear? This will clear the drawing and remove all the pictures below.', 'Yes', 'No', onComplete);
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
    const { results } = this.state;
    const onComplete = (result) => {
      const newResults = [
        ...results,
        result,
      ];
      this.setState({ results: newResults });
    };
    this.svgView.toDataURL(onComplete);
  }

  onRemoveImage = (uri) => {
    const { results } = this.state;
    const newResults = results.filter(item => item !== uri);
    this.setState({ results: newResults });
  }

  onSaveImageToDevice = async (uri) => {
    if (Platform.OS === 'ios') {
      const result = await CameraRoll.saveToCameraRoll(uri);
      // result contain actual uri of the image after saved
      alert('Success', 'Your drawing has been saved to device');
    } else {
      alert('Opps', 'Save Drawing to Android device has not implemented');
    }
  }

  isSaveDisabled = () => {
    const { paths } = this.props;
    if (paths.length === 0) {
      return true;
    }
    return false;
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
          isSaveDisabled={this.isSaveDisabled()}
          undo={this.onUndo}
          isUndoDisabled={this.isUndoDisabled()}
          redo={this.onRedo}
          isRedoDisabled={this.isRedoDisabled()}
          cancel={this.onCancel}
        />
        <ColorPalette onPress={this.onChangeColor} selected={this.state.color} />
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
        <ResultImage
          images={this.state.results}
          removeImage={this.onRemoveImage}
          saveImageToDevice={this.onSaveImageToDevice}
        />
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
