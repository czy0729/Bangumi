/*
 * @Author: czy0729
 * @Date: 2023-12-09 13:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:19:52
 */
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'
import type { ViewProps } from 'react-native'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 容器宽度 */
    width: number

    /** 容器高度 */
    height: number

    /** 圆角大小, 会根据容器宽度, 自动计算适合比例的大小 */
    radius: number | boolean
  }>
>

/**
 * 安卓原生超椭圆裁剪视图的入参
 *  - 直接吃 ViewProps (原生视图就是一个 ViewGroup, 需要 children / style / collapsable 等)
 * */
export type NativeSquircleProps = ViewProps & {
  /** 圆角大小 (dp, JS 端已按卡片尺寸算好) */
  radius: number

  /** 圆润度 (JS 端 getRoundness 的结果, 与 iOS 分支共用) */
  roundness: number
}

/** 超椭圆形状参数计算的入参 */
export type SquircleShapeInput = {
  /** 容器宽度 */
  width: number

  /** 容器高度 */
  height: number

  /** 圆角大小, 会根据容器宽度, 自动计算适合比例的大小 */
  radius?: number | boolean
}

/** 超椭圆形状参数 (iOS 遮罩与安卓原生视图共用) */
export type SquircleShape = {
  /** 参与计算的尺寸 (取宽高里有效的一个) */
  size: number

  /** 圆角大小 (已按尺寸算好) */
  radius: number

  /** 圆润度 */
  roundness: number
}

export type getMaskPathInput = {
  width: number
  height: number
  radius?: number
  roundness?: number
}
