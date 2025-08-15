/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:02:58
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 列表搜索框 */
function HomeFilter({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeFilter')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '显示列表搜索框',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661060312559-a94c0975-3b5e-4623-bfd2-9e00aedc4e59.png',
        '0/2022/png/386799/1661060318569-a7c55607-7a61-489f-ae6a-7bad94a6bb41.png'
      ])}
      {...TEXTS.homeFilter}
    >
      <Heatmap id='设置.切换' title='显示列表搜索框' />
    </ItemSetting>
  ))
}

export default HomeFilter
