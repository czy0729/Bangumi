/*
 * @Author: czy0729
 * @Date: 2023-04-01 05:42:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 09:43:12
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
  text: {
    marginLeft: 6
  }
}))
