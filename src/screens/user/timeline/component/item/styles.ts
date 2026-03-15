/*
 * @Author: czy0729
 * @Date: 2022-08-20 16:00:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 07:01:22
 */
import { _ } from '@stores'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'

export const WIDTH = _.r(IMG_WIDTH / 1.1)

export const HEIGHT = _.r(IMG_HEIGHT / 1.1)

export const memoStyles = _.memoStyles(() => ({
  nodeDay: {
    position: 'absolute',
    zIndex: 3,
    top: _.r(8),
    left: 0,
    width: _.r(6),
    height: _.r(6),
    marginTop: _.r(2),
    marginLeft: _.r(-12),
    backgroundColor: _.colorMain,
    borderRadius: _.r(3),
    transform: [
      {
        translateX: _.r(-3)
      }
    ]
  },
  subjects: {
    marginBottom: _.sm
  },
  cover: {
    width: WIDTH
  },
  subject: {
    width: '100%',
    marginBottom: _.sm
  },
  subjectHalf: {
    width: '100%',
    maxWidth: Math.floor((_.window.contentWidth - 2 * _.sm) / 2),
    paddingRight: _.sm,
    marginBottom: _.md
  },
  comment: {
    paddingVertical: _.sm,
    paddingHorizontal: 12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
