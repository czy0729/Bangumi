/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 16:49:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginHorizontal: _.wind
  },
  pagination: {
    height: 36
  },
  input: {
    height: 30,
    ..._.fontSize14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  touch: {
    borderRadius: 18,
    overflow: 'hidden'
  },
  check: {
    padding: _.sm
  }
}))
