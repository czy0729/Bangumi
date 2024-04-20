/*
 * @Author: czy0729
 * @Date: 2024-04-19 04:11:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-19 20:02:06
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 繁体 */
function S2T({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('s2t')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '繁体',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661132384882-626c4647-44c6-4462-8f6a-6faf757590c0.png',
        '0/2022/png/386799/1661132388033-f8d5e64b-be21-4712-9c87-e15f340e9b98.png'
      ])}
      {...TEXTS.s2t}
    >
      <Heatmap id='设置.切换' title='繁体' />
    </ItemSetting>
  ))
}

export default S2T
