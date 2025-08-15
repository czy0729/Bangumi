/*
 * @Author: czy0729
 * @Date: 2024-04-23 22:07:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 22:36:35
 */
import React from 'react'
import { Heatmap, SegmentedControl } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { styles } from './styles'

/** 菜单每行个数 */
function DiscoveryMenuNum({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('discoveryMenuNum')

  return useObserver(() => (
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
  ))
}

export default DiscoveryMenuNum
