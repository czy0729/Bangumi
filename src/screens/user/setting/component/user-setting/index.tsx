/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:51:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../types'

/** 个人设置 */
function UserSetting({ navigation, filter }: WithNavigation<WithFilterProps>) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)
  if (WEB || !shows) return null

  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        navigation.push('UserSetting')

        t('设置.跳转', {
          title: '个人设置',
          to: 'UserSetting'
        })
      }}
      {...TEXTS.userSetting}
    >
      <Heatmap id='设置.跳转' to='UserSetting' alias='个人设置' />
    </ItemSetting>
  )
}

export default observer(UserSetting)
