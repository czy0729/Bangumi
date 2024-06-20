/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:34:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 20:42:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 96
  },
  loading: {
    height: 96
  },
  item: {
    paddingVertical: _.r(2),
    paddingHorizontal: _.r(8),
    marginRight: _.r(8),
    marginBottom: _.r(8),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  itemDisabled: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  more: {
    paddingVertical: _.md,
    paddingHorizontal: 100,
    marginTop: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
