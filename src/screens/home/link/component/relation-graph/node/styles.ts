/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:14:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 19:35:29
 */
import { _ } from '@stores'
import { NODE_OFFSET, NODE_WIDTH, SCREEN_WIDTH, YEAR_TEXT_GAP } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  node: {
    width: NODE_WIDTH,
    marginVertical: 6
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 64,
    padding: 8,
    marginTop: NODE_OFFSET,
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden'
  },
  focus: {
    backgroundColor: '#182533',
    borderColor: '#4da3ff'
  },
  connected: {
    borderColor: 'rgba(255, 255, 255, 0.24)'
  },
  pressed: {
    opacity: 0.85
  },
  active: {
    backgroundColor: '#332200',
    borderColor: _.colorWarning
  },
  collect: {
    position: 'absolute',
    top: NODE_OFFSET / 2,
    right: 0,
    bottom: 0,
    marginRight: -((SCREEN_WIDTH - NODE_WIDTH) / 2) + YEAR_TEXT_GAP + 8,
    paddingVertical: 2,
    paddingHorizontal: YEAR_TEXT_GAP,
    pointerEvents: 'none',
    transform: [
      {
        skewX: '-10deg'
      }
    ]
  },
  override: {
    color: '#333',
    fontFamily: '',
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: -1
  }
}))
