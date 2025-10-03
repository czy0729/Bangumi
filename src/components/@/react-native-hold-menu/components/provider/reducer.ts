/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:50:59
 */
import { CONTEXT_MENU_STATE } from '../../constants'

export type StateProps = {
  active: number
  activeItem: string | null
  theme: 'light' | 'dark'
}

export enum ActionType {
  Active = 'Active',
  End = 'End',
  Theme = 'Theme'
}

export type Action =
  | { type: ActionType.Active; activeItem: string | null }
  | { type: ActionType.End }
  | { type: ActionType.Theme }

export const reducer = (state: StateProps, action: Action): StateProps => {
  switch (action.type) {
    case ActionType.Active:
      return {
        ...state,
        active: CONTEXT_MENU_STATE.ACTIVE,
        activeItem: action.activeItem
      }
    case ActionType.End:
      return {
        ...state,
        active: CONTEXT_MENU_STATE.END,
        activeItem: null
      }
    case ActionType.Theme:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      }
    default:
      return state
  }
}

export const initialState: StateProps = {
  active: 0,
  activeItem: null,
  theme: 'light'
}
