/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:16:43
 */
import { _ } from '@stores'
import { COLOR, MINI_HANDLE_WIDTH } from '../../ds'

export const styles = _.create({
  mini: {
    position: 'relative',
    marginTop: 8
  },
  /** 选择框: 跟手平移, 边框即区间范围 */
  selectBox: {
    position: 'absolute',
    left: 0,
    borderWidth: 1,
    borderColor: COLOR.miniSelect,
    borderRadius: 2
  },
  /** 选择框两侧把手 */
  handle: {
    position: 'absolute',
    width: MINI_HANDLE_WIDTH,
    borderRadius: 1,
    backgroundColor: COLOR.handle
  },
  miniYear: {
    position: 'absolute',
    bottom: 3,
    width: 28,
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
    color: COLOR.text
  }
})
