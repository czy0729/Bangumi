/*
 * @Author: czy0729
 * @Date: 2024-07-09 08:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 07:23:25
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1999,
    top: _.sm,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  body: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innerContainer: {
    backgroundColor: 'transparent'
  },
  innerWrap: {
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: _.select('rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.85)')
  },
  iconToast: {
    padding: _.lg,
    borderRadius: _.radiusLg
  },
  textToast: {
    padding: _.md,
    borderRadius: _.radiusSm
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: _.md
  }
}))
