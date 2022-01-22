/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-21 17:13:44
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'

function Rakuen({ navigation }) {
  return (
    <ItemSetting
      hd='超展开设置'
      arrow
      highlight
      onPress={() => {
        t('设置.跳转', {
          title: '超展开',
          to: 'RakuenSetting'
        })

        navigation.push('RakuenSetting')
      }}
    >
      <Heatmap id='设置.跳转' to='RakuenSetting' alias='超展开设置' />
    </ItemSetting>
  )
}

export default ob(Rakuen)
