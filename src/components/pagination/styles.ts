/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:56:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 05:52:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingBottom: _.web(_.sm, 0),
    marginHorizontal: _.wind,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  pagination: {
    height: 36
  },
  input: {
    height: 36,
    paddingVertical: 0,
    ..._.fontSize14,
    textAlign: 'center',
    backgroundColor: _.web('rgba(255, 255, 255, 0.16)', 'transparent'),
    borderWidth: 0
  },
  touch: {
    borderRadius: 18,
    overflow: 'hidden'
  },
  disabled: {
    opacity: 0.4
  }
}))
