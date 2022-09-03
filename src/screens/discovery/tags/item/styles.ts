/*
 * @Author: czy0729
 * @Date: 2022-09-03 13:10:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:15:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(_.num(4))
  return {
    container: {
      marginBottom: _.md,
      marginLeft,
      overflow: 'hidden',
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
    },
    item: {
      width,
      height: width,
      paddingHorizontal: _.sm
    }
  }
})
