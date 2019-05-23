import * as types from './types';

const actions = {
  changeLanguage(val) {
    return (dispatch, state) => {
      dispatch({
        type: types.CHANGE_LANGUAGE,
        val
      });
    };
  }
};

export default actions;

