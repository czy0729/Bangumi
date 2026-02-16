/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:21:01
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 自定义源头 */
function OriginSetting({ navigation, filter, setFalse }) {
  return useObserver(() => (
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
  ))
}

export default OriginSetting
