/*
 * @Author: czy0729
 * @Date: 2022-09-07 03:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:51:27
 */
import { _ } from '@stores'

/** 支持额四档色阶, 图表色块与图例共用 */
export const levelStyles = _.memoStyles(() => ({
  l1: {
    backgroundColor: _.select('rgb(210, 210, 210)', 'rgb(12, 12, 12)')
  },
  l2: {
    backgroundColor: _.select('rgb(222, 222, 222)', 'rgb(20, 20, 20)')
  },
  l3: {
    backgroundColor: _.select('rgb(238, 238, 238)', 'rgb(36, 36, 36)')
  },
  l4: {
    backgroundColor: _.select('rgb(255, 255, 255)', 'rgb(52, 52, 52)')
  }
}))
