/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-18 15:33:48
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: STORYBOOK ? _.sm : 0,
    marginHorizontal: _.wind,
    backgroundColor: _.colorPlain
  },
  pagination: {
    height: 36
  },
  input: {
    height: 36,
    paddingVertical: 0,
    ..._.fontSize14,
    textAlign: 'center',
    backgroundColor: STORYBOOK ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
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
