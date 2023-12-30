/*
 * @Author: czy0729
 * @Date: 2022-08-05 05:39:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 12:43:19
 */
import { _ } from '@stores'

const SIZE = 40

export const memoStyles = _.memoStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  filter: {
    width: 252,
    height: SIZE + _.sm * 2,
    paddingVertical: _.sm
  },
  input: {
    height: SIZE,
    paddingVertical: 0,
    marginVertical: 0,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: SIZE,
    overflow: 'hidden'
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    width: SIZE,
    height: SIZE
  }
}))
