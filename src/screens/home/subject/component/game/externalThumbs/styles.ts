/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-25 06:19:25
 */
import { _ } from '@stores'
import { THUMB_HEIGHT, THUMB_WIDTH } from './ds'

export const styles = _.create({
  container: {
    marginTop: _.sm
  },
  segment: {
    position: 'absolute',
    top: 0,
    right: _.wind - 10,
    marginTop: -36
  },
  segmentText: {
    letterSpacing: -0.4
  },
  item: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  image: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: _.radiusSm,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2),
    marginLeft: _.sm,
    overflow: 'hidden'
  },
  side: {
    marginLeft: 0,
    overflow: 'hidden'
  },
  mask: {
    position: 'absolute',
    ..._.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    pointerEvents: 'none'
  },
  label: {
    opacity: 0.58
  },
  sub: {
    marginTop: 2,
    opacity: 0.4
  }
})
