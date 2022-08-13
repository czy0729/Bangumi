/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:13:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 07:13:58
 */
import { TIMELINE_TYPE } from '@constants'

export const ROUTES = TIMELINE_TYPE.map(item => ({
  title: item.label,
  key: item.value
})).filter(item => !!item.title)
