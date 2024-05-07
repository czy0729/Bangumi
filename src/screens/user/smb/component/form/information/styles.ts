/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:21:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 07:06:27
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  info: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: STORYBOOK ? 0 : 20,
    marginTop: -20
  }
})
