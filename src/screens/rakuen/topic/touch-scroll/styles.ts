/*
 * @Author: czy0729
 * @Date: 2022-07-04 12:56:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 17:07:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  containerRight: {
    position: 'absolute',
    top: _.headerHeight + 8,
    right: 0,
    bottom: 68,
    width: _.r(16),
    backgroundColor: _.colorPlain
  },
  containerLeft: {
    position: 'absolute',
    top: _.headerHeight + 8,
    left: 0,
    bottom: 68,
    width: _.r(16),
    backgroundColor: _.colorPlain
  },
  containerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40,
    width: '100%',
    height: _.r(24),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  notLogin: {
    bottom: 0,
    height: _.r(32),
    paddingBottom: 8
  },
  itemTop: {
    height: _.window.height * 0.12,
    paddingTop: _.window.height * 0.02,
    marginTop: _.window.height * 0.02
  },
  itemBottom: {
    height: _.window.height * 0.12,
    paddingBottom: _.window.height * 0.02
  },
  itemVertical: {
    width: _.r(16),
    height: '100%'
  },
  itemHorizontal: {
    width: '100%',
    height: '100%'
  },
  itemNew: {
    borderRightWidth: 4,
    borderRightColor: _.select(_.colorMainLightBorder, 'rgb(59, 48, 51)')
  },
  itemText: {
    minHeight: _.r(24)
  },
  text: {
    width: '100%'
  }
}))
