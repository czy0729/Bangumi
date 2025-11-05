/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:42:18
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 个人设置 */
function UserSetting({ navigation, filter }) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)
  if (WEB || !shows) return null

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
