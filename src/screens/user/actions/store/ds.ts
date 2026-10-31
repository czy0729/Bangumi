/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:15:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页状态与常量
 */
import type { Loaded } from '@types'
import type { Edit, Item } from '../types'

/** 编辑表单初始值 */
export const INIT_EDIT: Edit = {
  show: false,
  uuid: '',
  name: '',
  url: '',
  sort: '',
  active: 1
}

export const STATE = {
  data: {
    data: [] as Item[]
  },
  edit: {
    ...INIT_EDIT
  },

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

/** 打开协议前的延时 */
export const DELAY_OPEN = 1600
