/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 贴贴 props 定义
 */
import type { Override, SubjectId } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<ComponentProps, 'relatedId'>,
  {
    /** 条目 Id */
    subjectId: SubjectId

    /** 是否显示创建贴贴的按钮 */
    showCreate?: boolean
  }
>
