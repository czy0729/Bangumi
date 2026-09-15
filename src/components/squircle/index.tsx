/*
 * @Author: czy0729
 * @Date: 2023-12-09 14:10:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:17:41
 *
 * Squircle 入口 (iOS 与兜底平台)
 *
 * 平台解析: index.android.tsx 走原生 outline 裁剪, index.web.tsx 走 react-ios-corners;
 * 本文件负责 iOS (MaskedView + SVG 遮罩出超椭圆轨迹), 以及没有专门实现的平台
 */
import Svg, { ClipPath, Defs, Path } from 'react-native-svg'
import { observer } from 'mobx-react'
import MaskedView from '@react-native-masked-view/masked-view'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import Radius from './radius'
import { getMaskPath, getSquircleShape } from './utils'
import { COMPONENT } from './ds'

import type { Props as SquircleProps } from './types'
export type { SquircleProps }

/**
 * 仿 iOS 平滑圆角的实现 (iOS / 兜底)
 *  - 若长和高一样, radius 大于等于长和高, 认为是圆
 *  - 用 masked-view 配合 svg 遮罩出超椭圆轨迹: 遮罩是图层级实现, 性能好, 也能被其他遮罩安全嵌套
 *  - 圆角与圆润度由 getSquircleShape 统一计算, 与安卓入口共用同一份曲线定义
 * */
export const Squircle = observer(
  ({ style, width = 0, height = 0, radius, children }: SquircleProps) => {
    r(COMPONENT)

    if (!radius || (!width && !height)) {
      return (
        <Component style={style} id='component-squircle'>
          {children}
        </Component>
      )
    }

    if (!systemStore.setting.squircle) {
      return (
        <Radius style={style} width={width} height={height} radius={radius}>
          {children}
        </Radius>
      )
    }

    const { radius: squircleRadius, roundness } = getSquircleShape({ width, height, radius })

    /** 生成 iOS 风格平滑圆角遮罩路径 */
    const maskPath = getMaskPath({
      width: width || height,
      height: height || width,
      radius: squircleRadius,
      roundness
    })

    return (
      <Component style={style} id='component-squircle'>
        <MaskedView
          maskElement={
            <Svg width='100%' height='100%'>
              <Defs>
                <ClipPath id='mask'>
                  <Path d={maskPath} />
                </ClipPath>
              </Defs>
              <Path fill='black' d={maskPath} clipPath='url(#mask)' />
            </Svg>
          }
        >
          {children}
        </MaskedView>
      </Component>
    )
  }
)

export default Squircle
