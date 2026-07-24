/*
 * @Author: czy0729
 * @Date: 2024-04-24 10:56:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 11:03:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import styles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

import type { WithFilterProps } from '../../../types'

/** 放送提醒菜单增加导出 ICS */
function HomeICS({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('exportICS')

  return (
    <ItemSetting
      ft={
        <SwitchPro
          style={styles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '导出ICS',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/png/386799/1675513866337-d4753afd-b998-4e5a-8955-faacfb3d9eae.png',
        '0/2023/png/386799/1675513933249-3b66e0de-9c53-425d-a263-0e6047595196.png',
        '0/2023/png/386799/1675513995664-4a1cfef0-66ed-47d5-8285-29df1534c1ee.png'
      ])}
      {...TEXTS.homeICS}
    >
      <Heatmap id='设置.切换' title='导出ICS' />
    </ItemSetting>
  )
}

export default observer(HomeICS)
