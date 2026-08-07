/*
 * @Author: czy0729
 * @Date: 2026-08-07 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-07 10:00:00
 */
import type { PropsWithChildren } from 'react'
import type { Props as ParentProps } from '../types'

export type Props = PropsWithChildren<
  Pick<ParentProps, 'tip' | 'comments'> & {
    /** 是否有圈列标签 */
    position: boolean

    /** 是否音乐类型 */
    isMusic: boolean
  }
>
