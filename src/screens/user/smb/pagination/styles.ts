/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 06:17:14
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: STORYBOOK ? 0 : _.ios(_.md + _.sm, _.md)
  },
  input: {
    height: 32,
    paddingVertical: 0,
    ..._.fontSize14,
    textAlign: 'center',
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 0
  }
})
