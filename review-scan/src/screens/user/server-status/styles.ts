/*
 * @Author: czy0729
 * @Date: 2022-08-20 10:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 20:44:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom + _.lg
  },
  desc: {
    width: '52%'
  },
  btn: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 24,
    left: _.wind,
    borderRadius: 40,
    overflow: 'hidden'
  },
  status: {
    width: 8,
    height: 8,
    marginRight: _.md,
    borderRadius: 4
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusWarning: {
    backgroundColor: _.colorWarning
  },
  statusDanger: {
    backgroundColor: _.colorDanger
  },
  loading: {
    width: 80
  },
  activity: {
    width: 56
  },
  btnCheck: {
    width: '100%',
    minWidth: 64,
    borderRadius: 16,
    overflow: 'hidden'
  }
}))
