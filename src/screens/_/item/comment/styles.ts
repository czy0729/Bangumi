/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 23:52:10
 */
import { _ } from '@stores'
import { ITEM_COMMENT_HEIGHT } from './ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    minHeight: ITEM_COMMENT_HEIGHT,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  avatar: {
    marginTop: _.md - 3,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md - 4,
    paddingRight: _.wind,
    marginLeft: _.sm
  }
}))
