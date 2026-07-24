/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:21:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** Webhook */
function Webhook({ navigation, filter, setFalse }: Props) {
  return (
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
  )
}

export default observer(Webhook)
