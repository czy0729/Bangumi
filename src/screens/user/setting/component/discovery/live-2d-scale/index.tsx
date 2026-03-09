/*
 * @Author: czy0729
 * @Date: 2026-03-10 00:53:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 01:21:05
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { DATA } from './ds'
import { styles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 看板娘 Live2D 大小 */
function Live2DScale({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('live2dScale')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={DATA}
          selectedIndex={DATA.findIndex(item => item === value)}
          onValueChange={label => {
            handleSet(label)

            t('设置.切换', {
              title: 'Live2d 大小',
              label
            })
          }}
        />
      }
      filter={filter}
      sub
      {...TEXTS.live2dScale}
    >
      <Heatmap id='设置.切换' title='Live2d 大小' />
    </ItemSetting>
  ))
}

export default Live2DScale
