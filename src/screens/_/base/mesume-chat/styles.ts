/*
 * @Author: czy0729
 * @Date: 2025-02-02 17:27:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-07 07:32:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1110,
    right: 0,
    bottom: 20,
    left: 0,
    paddingRight: _._wind,
    paddingLeft: _.sm
  },
  btnContent: {
    width: 40,
    height: 40,
    backgroundColor: _.colorMainLight,
    borderRadius: 20,
    overflow: 'hidden'
  },
  mask: {
    zIndex: 1100
  },
  linear: {
    position: 'absolute',
    zIndex: 1101,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  item: {
    paddingVertical: 12
  },
  avatar: {
    width: 80,
    paddingRight: 12
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginTop: -1,
    backgroundColor: '#ee827c',
    borderWidth: 5,
    borderRadius: _.radiusMd,
    borderColor: _.select('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.88)')
  },
  toolBar: {
    marginTop: _.sm,
    marginRight: -4,
    marginBottom: -4,
    marginLeft: -8
  }
}))
