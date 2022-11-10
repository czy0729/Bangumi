/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:43:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:43:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailBg
  },
  item: {
    width: '50%',
    marginVertical: _.sm
  },
  full: {
    width: '100%'
  }
}))
