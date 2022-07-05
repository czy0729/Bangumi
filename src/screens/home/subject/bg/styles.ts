/*
 * @Author: czy0729
 * @Date: 2022-07-05 15:46:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-05 15:46:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bg: _.ios(
    {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: _.window.height / 2,
      backgroundColor: _.colorBg
    },
    {
      height: 160,
      backgroundColor: _.colorBg
    }
  )
}))
