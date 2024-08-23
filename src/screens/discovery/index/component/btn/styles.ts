/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:22:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 15:57:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const size = _.r(50)
  return {
    wrap: {
      width: (_.windowSm.width - 2 * _.windSm) * 0.249,
      height: (_.windowSm.width - 2 * _.windSm) * 0.249,
      paddingVertical: _.sm + 4
    },
    wrapSm: {
      width: (_.windowSm.width - 2 * _.windSm) * 0.198,
      paddingVertical: _.sm + 4
    },
    item: {
      width: (_.windowSm.width - 2 * _.windSm) / 4
    },
    itemSm: {
      width: (_.windowSm.width - 2 * _.windSm) / 5
    },
    iconWrap: {
      width: size
    },
    iconWrapSm: {
      width: size - 4
    },
    icon: {
      width: size,
      height: size,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
      // borderRadius: size
    },
    iconSm: {
      width: size - 4,
      height: size - 4,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
      // borderRadius: size - 4
    },
    split: {
      width: 3,
      height: 28,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel2),
      borderRadius: 2
    },
    disabled: {
      opacity: 0.4
    }
  }
})
