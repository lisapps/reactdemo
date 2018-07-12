import { push } from 'react-router-redux';

export function onEnd() {
  return function(dispatch) {
    return dispatch(push('/demo'));
  };
}
