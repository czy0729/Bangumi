/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:11:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物近况条目样式
 */
import { flexStyle } from '@components'
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  title: {
    ...flexStyle({ align: 'start' }),
    ..._.container.block
  },
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
