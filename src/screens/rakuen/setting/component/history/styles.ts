/*
 * @Author: czy0729
 * @Date: 2022-08-22 15:53:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-22 15:53:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _._wind,
    paddingBottom: _.sm
  },
  item: {
    paddingRight: _.sm
  },
  content: {
    marginTop: _.sm
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
}))
