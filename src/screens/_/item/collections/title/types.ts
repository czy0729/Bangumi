/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 标题 props 定义
 */
import type { Props as ComponentProps } from '../types'

export type Props = Pick<ComponentProps, 'name' | 'nameCn' | 'filter' | 'numberOfLines'>
