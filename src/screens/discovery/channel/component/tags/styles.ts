/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:39:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-02 14:39:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    marginTop: 12
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs
  }
}))
