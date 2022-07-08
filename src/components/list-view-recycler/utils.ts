/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:59:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 08:35:48
 */
import { toJS } from 'mobx'

export const VIEW_TYPES = {
  HEADER: 'header',
  ROW: 'row',
  FOOTER: 'footer'
} as const

export function getData(data, ListHeaderComponent) {
  if (ListHeaderComponent) {
    return [
      {
        id: VIEW_TYPES.HEADER
      },
      ...toJS(data.list)
    ]
  }

  return toJS(data.list)
}
