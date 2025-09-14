/*
 * @Author: czy0729
 * @Date: 2024-04-25 14:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 16:50:32
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

/** 小圣杯 */
function AppTinygrail({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('tinygrail')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '小圣杯',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661214518986-f6760da2-6a78-489b-85fc-2c7fabf97279.png',
        '0/2022/png/386799/1661214525841-58dcbaf0-c0a7-446f-8045-69d855e32914.png',
        '0/2022/png/386799/1661214653550-d0132b94-b2ff-4e6c-97ab-2cd15b1bc48b.png',
        '0/2022/png/386799/1661214535802-72f9dad6-5869-4518-86a1-048e4046c900.png',
        '0/2022/png/386799/1661214600784-c75037d5-4c7a-4022-92ad-679dc49be9b9.png',
        '0/2022/png/386799/1661214604762-9e11c96f-7841-4581-8e34-e77c5a71a139.png'
      ])}
      {...TEXTS.tinygrail}
    >
      <Heatmap id='设置.切换' title='小圣杯' />
    </ItemSetting>
  ))
}

export default AppTinygrail
