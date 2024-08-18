/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 06:48:32
 */
import { SUBJECT_TYPE } from '@constants'

export const COMPONENT = 'Tags'

export const TABS = SUBJECT_TYPE.map(item => ({
  title: item.title,
  key: item.label
}))
