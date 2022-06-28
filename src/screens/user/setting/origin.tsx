/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 04:35:25
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { NavigationProps } from '@types'

function Origin({ navigation }: NavigationProps) {
  return (
    <ItemSetting
      hd='源头'
      arrow
      highlight
      onPress={() => {
        t('设置.跳转', {
          title: '自定义源头',
          to: 'OriginSetting'
        })

        navigation.push('OriginSetting')
      }}
    >
      <Heatmap id='设置.跳转' to='OriginSetting' alias='自定义源头' />
    </ItemSetting>
  )
}

export default ob(Origin)
