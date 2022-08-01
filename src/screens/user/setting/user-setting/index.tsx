/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 13:21:32
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function UserSetting({ navigation, filter }) {
  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '个人设置',
          to: 'UserSetting'
        })

        navigation.push('UserSetting')
      }}
      {...TEXTS.userSetting}
    >
      <Heatmap id='设置.跳转' to='UserSetting' alias='个人设置' />
    </ItemSetting>
  )
}

export default ob(UserSetting)
