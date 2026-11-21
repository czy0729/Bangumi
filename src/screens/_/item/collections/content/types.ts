/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 内容容器 props 定义
 */
import type { PropsWithChildren } from 'react'
import type { Props as ComponentProps } from '../types'

export type Props = PropsWithChildren<Pick<ComponentProps, 'comments' | 'isCatalog' | 'isEditable'>>
