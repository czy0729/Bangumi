/*
 * @Author: czy0729
 * @Date: 2024-08-25 13:02:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-04 04:30:00
 */
import type { LinkProps } from '@components'
import type { Props as CharacterProps } from '../types'

export type Props = Pick<CharacterProps, 'type' | 'replies' | 'info' | 'positionDetails'> & {
  /** 跳转 Mono 页的 Link 属性 (父级统一构造, 封面与标题共用) */
  linkProps: LinkProps<'Mono'>

  /** 中文名 (父级由 nameCn/name 派生) */
  cn: string

  /** 日文名 (父级由 name/nameCn 派生) */
  jp: string

  /** 职位列表 (父级由 positions/position 派生) */
  position: string[]
}
