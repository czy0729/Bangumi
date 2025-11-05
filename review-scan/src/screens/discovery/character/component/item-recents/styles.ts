/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:11:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 20:37:22
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginVertical: _.md,
    backgroundColor: _.colorPlain
  },
  inView: {
    width: COVER_WIDTH
  },
  content: {
    minHeight: COVER_HEIGHT + 6
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  actors: {
    width: '50%'
  }
}))
