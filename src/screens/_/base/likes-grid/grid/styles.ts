/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:33:47
 */
import { _ } from '@stores'

const width = 240

export const styles = _.create({
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  item: {
    width: width * 0.2,
    height: width * 0.2
  },
  itemActive: {
    backgroundColor: 'rgba(254, 138, 149, 0.12)'
  },
  bgm: {
    marginTop: _.ios(-3, -6),
    opacity: _.ios(1, 0.5)
  }
})
