/*
 * @Author: czy0729
 * @Date: 2022-05-03 18:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:37
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const styles = _.create({
  empty: {
    paddingHorizontal: _.wind,
    minHeight: WEB ? _.window.height * 0.64 : 400
  }
})
