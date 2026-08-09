/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:19:19
 */
import { _ } from '@stores'
import {
  MENU_BORDER_DARK_COLOR,
  MENU_BORDER_LIGHT_COLOR,
  MENU_ITEM_PADDING_VERTICAL,
  MENU_SEPARATOR_HEIGHT,
  MENU_TEXT_DARK_COLOR,
  MENU_TEXT_DESTRUCTIVE_DARK_COLOR,
  MENU_TEXT_DESTRUCTIVE_LIGHT_COLOR,
  MENU_TEXT_LIGHT_COLOR,
  MENU_TITLE_COLOR
} from '../../ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: _.r(MENU_ITEM_PADDING_VERTICAL),
    paddingHorizontal: _.r(16)
  },
  border: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.select(MENU_BORDER_LIGHT_COLOR, MENU_BORDER_DARK_COLOR)
  },
  text: {
    color: _.select(MENU_TEXT_LIGHT_COLOR, MENU_TEXT_DARK_COLOR)
  },
  title: {
    color: MENU_TITLE_COLOR
  },
  destructive: {
    color: _.select(MENU_TEXT_DESTRUCTIVE_LIGHT_COLOR, MENU_TEXT_DESTRUCTIVE_DARK_COLOR)
  },
  separator: {
    width: '100%',
    height: MENU_SEPARATOR_HEIGHT
  }
}))
