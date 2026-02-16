/*
 * @Author: czy0729
 * @Date: 2024-01-13 23:02:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 23:04:17
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemArticle')

const D = new Date()

export const Y = String(D.getFullYear()).slice(2, 4)
