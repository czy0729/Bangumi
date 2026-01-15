/*
 * @Author: czy0729
 * @Date: 2025-12-14 18:52:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 12:41:37
 */
import { _ } from '@stores'
import { YEAR_TEXT_GAP } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  stage: {
    position: 'absolute',
    left: 0,
    width: '100%',
    zIndex: -1,
    pointerEvents: 'none',
    flexDirection: 'row',
    alignItems: 'center'
  },
  section: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  active: {
    backgroundColor: _.select('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.08)')
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    paddingLeft: 4
  },
  text: {
    paddingVertical: 2,
    paddingHorizontal: YEAR_TEXT_GAP,
    color: _.select('#bbb', '#333'),
    fontFamily: 'Avenir',
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: -1 + _.letterSpacing
  }
}))
