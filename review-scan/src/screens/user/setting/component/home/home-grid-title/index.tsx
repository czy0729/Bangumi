/*
 * @Author: czy0729
 * @Date: 2024-04-24 08:37:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 08:42:15
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

/** 条目下方显示标题 */
function HomeGridTitle({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeGridTitle')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '条目下方显示标题',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/png/386799/1678163227317-132cc2a7-cc59-4857-80e4-1f3514bc2b54.png',
        '0/2023/png/386799/1678163282725-900bfed3-3d91-466e-ba92-cf62079b69bb.png'
      ])}
      sub
      {...TEXTS.homeGridTitle}
    >
      <Heatmap id='设置.切换' title='条目下方显示标题' />
    </ItemSetting>
  ))
}

export default HomeGridTitle
