/*
 * @Author: czy0729
 * @Date: 2026-08-28 01:58:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:58:44
 */
import type { SubjectType } from '@constants/model/types'
import type { WithNavigation } from '@types'

export type Props = WithNavigation<{
  /** 条目类型菜单项 */
  item: {
    label: SubjectType

    /** 类型中文名 */
    title: string
  }

  /** 关闭 ActionSheet */
  setFalse: () => void
}>
