/*
 * @Author: czy0729
 * @Date: 2023-11-18 09:26:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 12:12:08
 */
import { _ } from '@stores'

export const styles = _.create({
  pagination: _.web(
    {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: 0,
      left: 0,
      paddingTop: _.xs,
      backgroundColor: 'rgba(0, 0, 0, 0.84)'
    },
    {
      marginTop: _.xs
    }
  ),
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
