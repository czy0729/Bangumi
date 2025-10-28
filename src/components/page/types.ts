/*
 * @Author: czy0729
 * @Date: 2022-08-16 12:49:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:51:55
 */
import type { PropsWithChildren } from 'react'
import type { ColorValue, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否加载中，通常传入 store._loaded */
    loaded?: boolean | string | number

    /** 加载指示器颜色 */
    loadingColor?: ColorValue

    /** 加载指示器背景颜色 */
    backgroundColor?: ColorValue

    /** 页面内的加载指示器 */
    loading?: boolean

    /** 是否自动触发默认 StatusBar 事件 */
    statusBarEvent?: boolean
  }>
>
