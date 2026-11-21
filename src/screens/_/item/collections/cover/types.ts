/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 封面 props 定义
 */
import type { Override, SubjectId } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<ComponentProps, 'cover' | 'type'>,
  {
    /** 列表下标 (决定封面加载优先级) */
    index: number

    /** 条目 Id */
    subjectId: SubjectId

    /** InView 纵向触发值 */
    y?: number

    /** 点击封面 */
    onPress: () => void
  }
>
