/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:39:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 标签样式
 */
import { _ } from '@stores'
import { CARD_PADDING } from '../ds'

/** 标签之间的间距 */
export const TAG_GAP = _.sm

export const memoStyles = _.memoStyles(() => ({
  card: {
    marginTop: CARD_PADDING,
    marginHorizontal: _.wind,
    paddingVertical: CARD_PADDING,
    paddingHorizontal: CARD_PADDING,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  tags: {
    marginRight: -TAG_GAP
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: TAG_GAP,
    marginBottom: TAG_GAP,
    backgroundColor: _.colorBg,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  }
}))
