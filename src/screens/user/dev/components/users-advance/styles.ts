/*
 * @Author: czy0729
 * @Date: 2022-08-19 03:18:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 03:18:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    height: 342,
    marginTop: _.sm,
    marginHorizontal: _.wind,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
