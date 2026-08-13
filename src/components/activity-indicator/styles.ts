/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const styles = _.create({
  container: {
    position: 'absolute',
    zIndex: 1999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 89,
    height: 89,
    borderRadius: _.radiusMd,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  text: {
    marginLeft: _.sm
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
