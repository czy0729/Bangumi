/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-15 05:01:43
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: STORYBOOK ? _.bottom : 0,
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
