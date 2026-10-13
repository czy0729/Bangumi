/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 最新帖子样式
 */
import { _ } from '@stores'
import { CARD_PADDING } from '../ds'

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
  side: {
    marginTop: -2,
    marginLeft: _.lg
  }
}))
