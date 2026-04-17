/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:07:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-16 21:42:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { styles } from './styles'

import type { WithFilterProps } from '../../../types'

/** 菜单每行个数 */
function DiscoveryMenuNum({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('discoveryMenuNum')

  return (
    <ItemSetting
      ft={
        <SegmentedControl
          style={styles.segmentedControl}
          size={12}
          values={['4', '5']}
          selectedIndex={value == 4 ? 0 : 1}
          onValueChange={label => {
            handleSet(value == 4 ? 5 : 4)

            t('设置.切换', {
              title: '发现菜单个数',
              label
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.discoveryMenuNum}
    >
      <Heatmap id='设置.切换' title='菜单每行个数' />
    </ItemSetting>
  )
}

export default observer(DiscoveryMenuNum)
