/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:20:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:50:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { TEXTS } from '../ds'
import { IconWebhook } from '../../icons'

import type { Props } from './types'

/** Webhook */
function Webhook({ filter, setFalse }: Props) {
  const navigation = useNavigation()

  return (
    <ItemSetting
      icon={<IconWebhook />}
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
