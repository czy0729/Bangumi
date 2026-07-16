/*
 * @Author: czy0729
 * @Date: 2025-01-25 23:17:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:29
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

export const styles = _.create({
  content: {
    flex: 1,
    height: IMG_HEIGHT_LG,
    marginLeft: _._wind
  },
  flux: {
    height: 'auto',
    minHeight: IMG_HEIGHT_LG
  },
  music: {
    height: 'auto',
    minHeight: Math.floor(IMG_WIDTH_LG * 1.1 - 10)
  }
})
