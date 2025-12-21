/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 20:16:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md,
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
  btn: {
    paddingVertical: _.sm,
    borderWidth: 3,
    borderRadius: _.radiusMd,
    borderColor: _.select('#000', 'rgba(255, 255, 255, 0.88)')
  }
}))
