/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 收藏管理按钮 props 定义
 */
import type { Override, SubjectId, SubjectTypeCn } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Required<Pick<ComponentProps, 'name' | 'nameCn' | 'collection'>>,
  {
    /** 条目 Id */
    subjectId: SubjectId

    /** 条目类型 (中文) */
    typeCn: SubjectTypeCn
  }
>
