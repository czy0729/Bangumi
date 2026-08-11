/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const styles = _.create({
  progressOuter: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    flex: 1
  },
  progressBar: {
    borderBottomWidth: 4,
    borderStyle: 'solid',
    borderColor: 'rgb(13, 183, 243)'
  }
})