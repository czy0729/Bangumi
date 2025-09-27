/*
 * @Author: czy0729
 * @Date: 2024-04-24 11:12:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 12:59:51
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

/** 一直显示放送时间 */
function HomeOnair({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeOnAir')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '一直显示放送时间',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661241773996-701bcab2-3841-4f04-be90-7fb7b6baaf6a.png',
        '0/2022/png/386799/1661241775968-cd2588bb-32e4-46d9-b59e-786c82c46cd8.png'
      ])}
      {...TEXTS.homeOnAir}
    >
      <Heatmap id='设置.切换' title='一直显示放送时间' />
    </ItemSetting>
  ))
}

export default HomeOnair
