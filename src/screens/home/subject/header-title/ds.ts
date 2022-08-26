/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:51:56
 */
import { StoreType as $ } from '../types'

export const IMAGE_WIDTH = 28

export const IMAGE_HEIGHT = IMAGE_WIDTH * 1.28

export const DEFAULT_PROPS = {
  common: '' as string,
  score: '' as $['rating']['score'],
  type: '' as $['type'],
  cn: '' as $['cn'],
  jp: '' as $['jp'],
  titleLabel: '' as $['titleLabel']
}
