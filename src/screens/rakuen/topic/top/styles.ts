/*
 * @Author: czy0729
 * @Date: 2022-08-28 13:20:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 13:20:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  groupWrap: {
    minHeight: _.r(32),
    marginTop: _.sm,
    marginBottom: _.xs
  },
  groupLabel: {
    overflow: 'hidden',
    maxWidth: '100%',
    padding: 4,
    paddingRight: 10,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs
  },
  group: {
    maxWidth: _.window.contentWidth * 0.6
  },
  userWrap: {
    height: _.r(42),
    marginTop: _.sm
  },
  katakana: {
    marginTop: -12
  },
  loading: {
    height: _.r(240)
  }
}))
