/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:06:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 20:16:50
 *
 * 留言输入区样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    paddingTop: _.sm,
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  textarea: {
    backgroundColor: _.select(_.colorBg, 'rgba(255, 255, 255, 0.24)'),
    borderWidth: 3,
    borderColor: _.select('#000', 'rgba(255, 255, 255, 0.88)'),
    borderRadius: _.radiusMd
  },
  input: {
    ..._.fontSize15,
    color: _.colorDesc
  },
  btn: {
    paddingVertical: _.sm,
    borderWidth: 3,
    borderColor: _.select('#000', 'rgba(255, 255, 255, 0.88)'),
    borderRadius: _.radiusMd
  }
}))
