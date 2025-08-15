/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:35:00
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 超展开 */
function Rakuen({ navigation, filter }) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '超展开',
          to: 'RakuenSetting'
        })

        navigation.push('RakuenSetting')
      }}
      {...TEXTS.rakuen}
    >
      <Heatmap id='设置.跳转' to='RakuenSetting' alias='超展开设置' />
    </ItemSetting>
  )
}

export default ob(Rakuen)
