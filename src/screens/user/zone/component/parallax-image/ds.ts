/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 20:41:32
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import Bg from './bg'
import Center from './center'
import Header from './header'
import Mask from './mask'

export const COMPONENT = rc(PARENT, 'ParallaxImage')

export const Layers = [Bg, Mask, Header, Center] as const
