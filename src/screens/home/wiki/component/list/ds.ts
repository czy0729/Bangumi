/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:10:19
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const COVER_WIDTH = _.r(IMG_WIDTH * 1.28)

export const COVER_HEIGHT = _.r(IMG_HEIGHT * 1.28)
