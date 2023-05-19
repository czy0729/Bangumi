/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:42:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 04:55:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    height: 28,
    paddingRight: 9,
    paddingLeft: 10,
    marginRight: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: 16
  },
  itemActive: {
    backgroundColor: _.select('rgba(255, 208, 214, 0.4)', _.colorMainLight)
  },
  bgm: {
    marginTop: _.ios(0, 3)
  },
  image: {
    marginTop: _.ios(-2, -1),
    opacity: _.ios(1, 0.5)
  },
  text: {
    marginLeft: 6
  }
}))
