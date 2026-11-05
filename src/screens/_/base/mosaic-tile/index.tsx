/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 瓷砖热力图: 过去一年的活动格子 + 底部类型切换
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import Footer from './footer'
import Grid from './grid'
import { getMosaicFrame, getMosaicTotal } from './utils'
import { COMPONENT, TYPE_UNITS } from './ds'

import type { Props as MosaicTileProps } from './types'
export type { MosaicTileProps }

export const MosaicTile = observer(
  ({ mosaicTile, type = 'all', loading, onTypeChange }: MosaicTileProps) => {
    r(COMPONENT)

    if (!mosaicTile) return null

    const { days, monthColumns, todayStr } = getMosaicFrame()
    const unit = TYPE_UNITS[type]

    return (
      <View style={_.mb.sm}>
        <Grid
          days={days}
          monthColumns={monthColumns}
          mosaicTile={mosaicTile}
          todayStr={todayStr}
          unit={unit}
        />
        <Footer
          type={type}
          loading={loading}
          total={getMosaicTotal(days, mosaicTile)}
          unit={unit}
          onTypeChange={onTypeChange}
        />
      </View>
    )
  }
)

export default MosaicTile
