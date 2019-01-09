import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Switch,
  Modal,
  StyleSheet,
} from 'react-native';
import Actions from 'actions';
import * as Colors from 'utils/colors';
import { confirmation } from 'utils/alert';
import DrawBoard from './components/DrawBoard';
import ResultImage from './components/ResultImage';
import { connect } from 'react-redux';
import Header from './components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorPalette from './components/ColorPalette';
import * as ColorsApp from 'themes/colors';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: ColorsApp.modalBg,
    padding: 30,
  },
  innerModal: {
    borderRadius: 10,
    backgroundColor: ColorsApp.white,
    padding: 10,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dismiss: {
    alignSelf: 'flex-end',
    zIndex: 20,
    marginRight: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      color: Colors.color13,
      strokeWidth: 4,
      saveWithBackground: false,
      isSettingModalVisible: false,
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

  openSetting = () => {
    this.setState({ isSettingModalVisible: true });
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

  renderSettingModal = () => {
    const { isSettingModalVisible, saveWithBackground } = this.state;
    const dismiss = () => this.setState({ isSettingModalVisible: false });
    return (
      <Modal
        transparent
        visible={isSettingModalVisible}
        onRequestClose={() => {
          dismiss(); // this modal can be dismiss (some cannot dismiss like fingerprint)
        }}
      >
        <TouchableWithoutFeedback onPress={dismiss}>
          <View style={styles.modal}>
            <View style={styles.innerModal}>
              <View style={styles.settingHeader}>
                <Text style={styles.settingTitle}>Setting</Text>
                <TouchableOpacity style={styles.dismiss} onPress={dismiss}>
                  <Icon name="ios-close" size={30} color={Colors.secondary} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Save with background</Text>
                <Switch value={saveWithBackground} onValueChange={() => this.setState({ saveWithBackground: !saveWithBackground })} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  render() {
    const { saveWithBackground } = this.state;
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
          setting={this.openSetting}
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
          saveWithBackground={saveWithBackground}
        />
        {this.renderSettingModal()}
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
