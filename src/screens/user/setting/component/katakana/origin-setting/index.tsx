/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:17:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 自定义源头 */
function OriginSetting({ navigation, filter, setFalse }: Props) {
  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        setFalse()
        setTimeout(() => {
          navigation.push('OriginSetting')
        }, 80)

        t('设置.跳转', {
          title: '自定义源头',
          to: 'OriginSetting'
        })
      }}
      {...TEXTS.origin}
    >
      <Heatmap id='设置.跳转' to='OriginSetting' alias='自定义源头' />
    </ItemSetting>
  )
}

export default observer(OriginSetting)
