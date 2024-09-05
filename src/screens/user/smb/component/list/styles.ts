/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:07:54
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const styles = _.create({
  scrollView: WEB
    ? {
        paddingTop: 104,
        paddingBottom: 32
      }
    : {}
})
