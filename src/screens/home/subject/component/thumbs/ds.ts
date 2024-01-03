/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:22:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Thumbs')

export const IMAGE_HEIGHT = 144

export const THUMB_WIDTH = Math.floor(IMAGE_HEIGHT / 0.56)

export const THUMB_HEIGHT = IMAGE_HEIGHT
