/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:27:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:11:38
 */
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /**
     * 组件名, 至少需要有一横杠, 不然可能会被 react 认为你是写错的
     * `${'component' | 'base' | 'item' | 'icon' | 'screen'}-${string}` | 'div'
     * */
    id: string
    'data-title'?: string
    parseParams?: boolean
  }>
>

export type CustomClassnames = 'p-r' | 'd-b'
