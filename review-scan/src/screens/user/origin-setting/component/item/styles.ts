/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:28:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-12 23:33:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '29%',
    marginBottom: _.md,
    marginHorizontal: '2.1%'
  },
  item: {
    height: 88,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd
  },
  itemActive: {
    borderColor: _.colorSuccess
  },
  icon: {
    width: 28,
    height: 28
  },
  iconRound: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  badge: {
    width: 28,
    height: 28,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2),
    borderRadius: 28,
    overflow: 'hidden'
  }
}))
