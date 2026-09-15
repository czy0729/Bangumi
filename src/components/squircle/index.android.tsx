/*
 * @Author: czy0729
 * @Date: 2026-09-16 00:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 00:20:00
 *
 * Squircle 安卓入口
 *
 * 与 index.tsx (iOS / 兜底) 分开的理由: 安卓走的是原生 outline 裁剪, 完全不经过 MaskedView,
 * 拆成平台文件后这套实现不会进 iOS bundle, 也不需要再在运行时判断平台
 */
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import { NativeSquircle } from './native'
import Radius from './radius'
import { getSquircleShape } from './utils'
import { COMPONENT } from './ds'

import type { Props as SquircleProps } from './types'
export type { SquircleProps }

/**
 * 仿 iOS 平滑圆角的实现 (安卓)
 *  - 用原生 outline 裁剪: 系统渲染层直接裁凸路径, 零位图零遮罩,
 *    因此卡片内部的遮罩 (封面底部氛围色场的羽化) 可以照常使用
 *  - 圆角与圆润度由 getSquircleShape 算好传给原生视图, 与 iOS 入口共用同一份曲线定义
 *  - 原生视图未注册时 (尚未重新编译原生包) 退回原生圆角, 而不是退回 MaskedView,
 *    避免和卡片内部色场的遮罩形成嵌套
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

    if (NativeSquircle) {
      /**
       * style 必须给到原生视图本身: 裁剪盒就是它自己的尺寸, 若由外层承接,
       * 调用方把宽高写在 style 里时原生视图会拿不到尺寸而裁错形状
       * (这里的 Component 只带 id 调试属性时不会渲染额外节点, 所以不会多一层布局)
       * */
      return (
        <Component id='component-squircle'>
          <NativeSquircle
            style={style}
            radius={squircleRadius}
            roundness={roundness}
            collapsable={false}
          >
            {children}
          </NativeSquircle>
        </Component>
      )
    }

    return (
      <Radius style={style} width={width} height={height} radius={squircleRadius}>
        {children}
      </Radius>
    )
  }
)

export default Squircle
