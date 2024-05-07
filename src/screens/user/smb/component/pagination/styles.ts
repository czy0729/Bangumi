/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 15:51:38
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const styles = _.create({
  pagination: STORYBOOK
    ? {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0,
        left: 0,
        paddingTop: _.xs,
        backgroundColor: 'rgba(0, 0, 0, 0.84)'
      }
    : {
        marginTop: _.xs,
        marginBottom: _.ios(_.md + _.sm, _.md)
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
