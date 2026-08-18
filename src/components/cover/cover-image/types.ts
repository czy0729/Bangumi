/*
 * @Author: czy0729
 * @Date: 2026-08-18 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 14:00:00
 */
import type { Props as CoverProps } from '../types'

/** 封面图片渲染子组件 props (去除拟物/特殊逻辑字段) */
export type Props = Omit<
  CoverProps,
  'containerStyle' | 'bodyStyle' | 'angleStyle' | 'noDefault' | 'type' | 'useType' | 'cdn'
>
