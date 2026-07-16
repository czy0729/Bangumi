/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:31:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:28:52
 */
import { _ } from '@stores'

const width = 200

export const styles = _.create({
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  item: {
    width: Math.floor(width * 0.25),
    height: Math.floor(width * 0.25)
  },
  itemActive: {
    backgroundColor: 'rgba(254, 138, 149, 0.12)'
  },
  bgm: {
    marginTop: -6
  }
})
