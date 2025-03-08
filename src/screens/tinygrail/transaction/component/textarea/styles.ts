/*
 * @Author: czy0729
 * @Date: 2025-03-07 14:42:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 15:39:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.lg,
    backgroundColor: _.colorPlain
  },
  textarea: {
    borderWidth: 3,
    borderRadius: _.radiusMd,
    borderColor: _.select('#000', 'rgba(255, 255, 255, 0.88)'),
    backgroundColor: _.select(_.colorBg, 'rgba(255, 255, 255, 0.24)')
  },
  input: {
    ..._.fontSize15,
    color: _.colorDesc
  },
  color: {
    width: 26,
    height: 26,
    borderRadius: _.radiusSm,
    borderWidth: 3,
    borderColor: _.select('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.88)')
  },
  btn: {
    paddingVertical: _.sm,
    borderWidth: 3,
    borderRadius: _.radiusMd,
    borderColor: _.select('#000', 'rgba(255, 255, 255, 0.88)')
  }
}))
