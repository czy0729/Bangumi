/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1999
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
  tip: {
    color: _.colorDesc,
    fontSize: _.fontSize14,
    marginLeft: _.sm
  },
  toast: {
    color: '#fff',
    fontSize: _.fontSize14,
    marginTop: _.sm
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))