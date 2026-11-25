/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:25:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 15:00:00
 */
import { _ } from '@stores'
import { CLEAR_SIZE } from '../ds'

export const styles = _.create({
  close: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 0,
    marginTop: -CLEAR_SIZE / 2,
    borderRadius: CLEAR_SIZE / 2,
    overflow: 'hidden'
  },
  /** 多行时对齐首行, 不随容器高度居中 */
  closeMultiline: {
    position: 'absolute',
    zIndex: 10,
    top: 4,
    right: 0,
    borderRadius: CLEAR_SIZE / 2,
    overflow: 'hidden'
  },
  icon: {
    width: CLEAR_SIZE,
    height: CLEAR_SIZE
  }
})
