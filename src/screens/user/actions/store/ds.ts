/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:15:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:39:43
 */
import { Loaded } from '@types'
import { Item } from '../types'

export const COMPONENT = 'Actions'

export const STATE = {
  data: {
    data: []
  },
  edit: {
    show: false,
    uuid: '',
    name: '',
    url: '',
    sort: '',
    active: 1
  } as Item,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
