/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:11:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 06:04:29
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginVertical: _.md,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  inView: {
    width: COVER_WIDTH
  },
  content: {
    minHeight: COVER_HEIGHT + 4
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  actors: {
    width: '50%'
  },
  dividerLine: {
    height: 1,
    marginVertical: _.md,
    marginHorizontal: _._wind,
    backgroundColor: _.colorMain
  }
}))
