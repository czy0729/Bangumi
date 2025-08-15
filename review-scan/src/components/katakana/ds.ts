/*
 * @Author: czy0729
 * @Date: 2022-08-12 11:47:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:43:19
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT_PROVIDER = rc(PARENT, 'KatakanaProvider')

export const COMPONENT = rc(PARENT, 'Katakana')

export const NAMESPACE = 'ComponentKatakana'

export const CACHE_KEY = `${NAMESPACE}|cache`
