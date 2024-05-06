/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:15:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:18:54
 */
import { Loaded } from '@types'
import { Item } from './types'

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
  _loaded: false as Loaded
}
