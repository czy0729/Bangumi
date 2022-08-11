/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 04:33:53
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
    height: 36,
    paddingVertical: 0,
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
