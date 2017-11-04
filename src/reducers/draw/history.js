import Actions from 'actions';

const getDefaultState = () => ({
  paths: [],
  currentStep: 0,
});

function addPath(state, action) {
  const totalLength = state.paths.length;
  const currentStep = state.currentStep;
  const difference = totalLength - currentStep;
  if (state.currentStep < totalLength) {
    const cutOffPath = state.paths.slice(0, -difference);
    newPaths = [
      ...cutOffPath,
      action.path,
    ];
  } else {
    newPaths = [
      ...state.paths,
      action.path,
    ];
  }
  return Object.assign({}, {
    paths: newPaths,
    currentStep: newPaths.length,
  });
}

function history(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.ADD_PATH:
      return addPath(state, action);
    case Actions.RESET_PATH: {
      return getDefaultState();
    }
    case Actions.UNDO_PATH:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case Actions.REDO_PATH:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    default:
      return state;
  }
}

export default history;
