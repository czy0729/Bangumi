/*
 * @Author: czy0729
 * @Date: 2022-08-20 10:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 列表行、状态点与底部按钮
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
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
  success: {
    backgroundColor: _.colorSuccess
  },
  warning: {
    backgroundColor: _.colorWarning
  },
  danger: {
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
