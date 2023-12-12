/*
 * @Author: czy0729
 * @Date: 2022-09-03 13:10:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 18:04:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(_.num(4))
  return {
    container: {
      marginBottom: _.md,
      marginLeft
    },
    item: {
      width,
      height: width,
      paddingHorizontal: _.sm,
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
    }
  }
})
