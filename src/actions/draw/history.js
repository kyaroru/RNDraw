export const NAME = 'HISTORY';

export const ADD_PATH = `${NAME}/ADD_PATH`;
export const RESET_PATH = `${NAME}/RESET_PATH`;
export const UNDO_PATH = `${NAME}/UNDO_PATH`;
export const REDO_PATH = `${NAME}/REDO_PATH`;

export const getDisplayPaths = (store) => {
  const paths = store.DRAW.history.paths;
  const currentStep = store.DRAW.history.currentStep;
  const difference = paths.length - currentStep;
  console.log(`total length: ${paths.length}, currentStep: ${currentStep}`);
  if (paths.length !== currentStep) {
    return paths.slice(0, -difference);
  }
  return paths;
};

export const getActualPaths = store => store.DRAW.history.paths;
export const getCurrentStep = store => store.DRAW.history.currentStep;

export const addPath = path => ({
  type: ADD_PATH,
  path,
});

export const resetPath = () => ({
  type: RESET_PATH,
});

export const undoPath = () => ({
  type: UNDO_PATH,
});

export const redoPath = () => ({
  type: REDO_PATH,
});
