/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:53:19
 */
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { MEDAL_COLORS } from './ds'
import { IconMedal } from './icons'

import type { Props } from './types'

/** 支持者奖牌: 金 / 银 / 铜 */
function LevelIcon({ type, size = 20 }: Props) {
  const colors = MEDAL_COLORS[type]

  return (
    <IconMedal
      size={size}
      main={_.select(colors.light.main, colors.dark.main)}
      edge={_.select(colors.light.edge, colors.dark.edge)}
      ribbon={_.select(colors.light.ribbon, colors.dark.ribbon)}
    />
  )
}

export default observer(LevelIcon)
