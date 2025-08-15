/*
 * @Author: czy0729
 * @Date: 2024-04-24 10:30:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 10:42:25
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

/** 条目自动下沉 */
function HomeSortSink({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('homeSortSink')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '自动下沉',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661045651857-7de7e8b7-34ce-4810-b6bd-d61d35412124.png',
        '0/2022/png/386799/1661045660979-be977cea-5eb2-45a7-8dd2-49ef4ec3966c.png'
      ])}
      sub
      {...TEXTS.homeSortSink}
    >
      <Heatmap id='设置.切换' title='自动下沉' />
    </ItemSetting>
  ))
}

export default HomeSortSink
