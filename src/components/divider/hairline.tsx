/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:20:00
 */
import React, { createContext } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

/**
 * 是否处于分组卡片内
 *  - 由 Block 提供, ITEM 行消费, 决定是否绘制行间细线
 *  - ActionSheet 的内容会经 Portal 渲染到 App 根部, 天然脱离此上下文
 */
export const HairlineContext = createContext(false)

/**
 * 分组卡片内, ITEM 行之间的细线 (与行内容左对齐)
 *  - 绘制策略对齐 components/tabs-v2 的底部线: 仅 Android 浅色模式绘制
 *  - 项目整体少用线, iOS 与深色模式 (卡片底色已足够区分行) 不绘制
 * */
export const Hairline = observer(({ style }: Props) => {
  r(COMPONENT)

  const height = _.select(_.ios(0, _.hairlineWidth), 0)
  if (!height) return null

  return (
    <View
      style={stl(
        {
          height,
          marginLeft: _._wind,
          backgroundColor: _.colorBorder,
          opacity: 0.88
        },
        style
      )}
    />
  )
})
