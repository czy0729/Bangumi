/*
 * @Author: czy0729
 * @Date: 2025-12-15 05:14:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-16 20:06:53
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
    backgroundColor: _.select(_.colorBg, '#1e1e1e'),
    borderWidth: _.select(1.5, 1),
    borderColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 10,
    overflow: 'hidden'
  },
  focus: {
    backgroundColor: _.select(_.colorPrimaryLight, '#182533'),
    borderColor: _.select(_.colorPrimary, '#4da3ff')
  },
  connected: {
    borderColor: _.select('rgba(0, 0, 0, 0.32)', 'rgba(255, 255, 255, 0.24)')
  },
  pressed: {
    opacity: 0.84
  },
  active: {
    backgroundColor: _.select(_.colorWarningLight, '#332200'),
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
    color: _.select('#bbb', '#333'),
    fontFamily: '',
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: -1
  }
}))
