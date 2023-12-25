/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:21:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:59:45
 */
import { _ } from '@stores'

export const styles = _.create({
  label: {
    width: 60
  },
  input: {
    height: 36,
    paddingVertical: 0,
    ..._.fontSize12
  },
  inputMultiline: {
    paddingVertical: 6,
    height: 100
  },
  multilineInputStyle: {
    ..._.fontSize12
  }
})
