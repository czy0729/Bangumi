/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:53:19
 */
import Svg, { Circle, Path } from 'react-native-svg'

import type { MedalProps } from './types'

/** 奖牌: 挂带 + 牌面 + 内圈 + 高光弧 */
export function IconMedal({ size = 20, main, edge, ribbon }: MedalProps) {
  return (
    <Svg width={size} height={size} viewBox='0 0 24 24'>
      <Path d='M12 1 L8.4 8.6 L10.6 12 L12 10.4 L13.4 12 L15.6 8.6 Z' fill={ribbon} />
      <Circle cx={12} cy={16} r={6.4} fill={main} stroke={edge} strokeWidth={1} />
      <Circle cx={12} cy={16} r={3.4} fill={edge} />
      <Path
        d='M9.4 13.8 A3.4 3.4 0 0 1 12 12.6'
        stroke='rgba(255, 255, 255, 0.64)'
        strokeWidth={1}
        strokeLinecap='round'
        fill='none'
      />
    </Svg>
  )
}
