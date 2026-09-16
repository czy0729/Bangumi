/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 01:30:00
 *
 * 圆环进度 (Web 降级)
 *  - RN Web 的图片引擎没有下载进度回调, 进度环在 Web 上永远只能是不确定态 (percent / textSize 无意义)
 *  - Web 构建没有 SVG 使用先例 (见 components/squircle/index.web.tsx 的说明), 故直接复用现成转圈
 *  - 用 size 撑出与原生一致的占位: ActivityIndicator 只能给 small / large, 无法精确到像素
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { ActivityIndicator } from '../activity-indicator'
import { styles } from './styles'

import type { Props } from './types'

/** 尺寸分档阈值: 与 RN ActivityIndicator 的 small (≈20px) / large (≈36px) 对齐 */
const LARGE_SIZE = 36

export const CircularProgress = observer(({ size = 40, color, style }: Props) => (
  <View style={stl(styles.container, { width: size, height: size }, style)}>
    <ActivityIndicator color={color} size={size >= LARGE_SIZE ? 'large' : 'small'} />
  </View>
))

export default CircularProgress
