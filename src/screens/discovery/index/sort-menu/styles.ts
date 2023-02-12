/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:35:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 04:19:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.windSm,
    minHeight: 100
  },
  transparent: {
    opacity: _.select(0.6, 0.4)
  },
  text: {
    marginTop: _.ios(_.sm, _.md),
    marginLeft: _.md,
    marginBottom: _.sm
  },
  btns: {
    paddingHorizontal: _.sm,
    marginVertical: _.md
  },
  touch: {
    borderRadius: _.r(36),
    overflow: 'hidden'
  },
  btn: {
    height: _.r(36),
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.r(36)
  },
  btnIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 12,
    top: 10
  },
  setting: {
    paddingHorizontal: _.sm,
    marginVertical: _.sm
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  segmentedControl: {
    height: _.r(28),
    width: _.r(128)
  },
  dragItem: {
    height: (_.windowSm.width - 2 * _.windSm) / 4
  }
}))
