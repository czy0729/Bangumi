/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-21 17:14:55
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'

function User({ navigation }) {
  return (
    <ItemSetting
      hd='个人设置'
      arrow
      highlight
      // information='时光机点击头像也能前往'
      onPress={() => {
        t('设置.跳转', {
          title: '个人设置',
          to: 'UserSetting'
        })

        navigation.push('UserSetting')
      }}
    >
      <Heatmap id='设置.跳转' to='UserSetting' alias='个人设置' />
    </ItemSetting>
  )
}

export default ob(User)
