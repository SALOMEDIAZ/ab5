import { reducer } from './reducer';

export function dispatch(action: any) {
  reducer(action);
  document.dispatchEvent(new CustomEvent('stateChanged'));
}
