/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:20:37
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** Webhook */
function Webhook({ navigation, filter, setFalse }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        setFalse()
        setTimeout(() => {
          navigation.push('Webhook')
        }, 80)

        t('设置.跳转', {
          title: 'Webhook',
          to: 'Webhook'
        })
      }}
      {...TEXTS.webhook}
    >
      <Heatmap id='设置.跳转' to='Webhook' alias='Webhook' />
    </ItemSetting>
  ))
}

export default Webhook
