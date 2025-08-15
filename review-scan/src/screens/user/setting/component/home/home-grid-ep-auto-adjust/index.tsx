/*
 * @Author: czy0729
 * @Date: 2024-04-24 08:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 09:20:39
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

/** 自动调整章节按钮大小 */
function HomeGridEpAutoAdjust({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeGridEpAutoAdjust')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '自动调整章节按钮大小',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/png/386799/1678163227317-132cc2a7-cc59-4857-80e4-1f3514bc2b54.png',
        '0/2023/png/386799/1678163234746-1e3952a5-73cc-495d-9e6a-6480f7d60b48.png'
      ])}
      sub
      {...TEXTS.homeGridEpAutoAdjust}
    >
      <Heatmap id='设置.切换' title='自动调整章节按钮大小' />
    </ItemSetting>
  ))
}

export default HomeGridEpAutoAdjust
