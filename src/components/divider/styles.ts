/*
 * @Author: czy0729
 * @Date: 2022-05-03 17:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 17:44:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  divider: {
    width: '100%',
    paddingVertical: _.md
  },
  text: {
    marginHorizontal: _.wind
  },
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: _.xs + 2,
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderRadius: 3,
    overflow: 'hidden'
  },
  line: {
    width: 64,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
