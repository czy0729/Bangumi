/*
 * @Author: czy0729
 * @Date: 2024-01-03 20:16:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:07:05
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Content')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  topicId: '' as $['topicId'],
  html: '' as $['html'],
  isEp: false as $['isEp'],
  id: '' as $['topic']['id'],
  formhash: '' as $['topic']['formhash'],
  likeType: '' as $['topic']['likeType'],
  translateResult: [] as $['state']['translateResult'],
  doTranslate: FROZEN_FN as $['doTranslate'],
  onLinkPress: FROZEN_FN
}
