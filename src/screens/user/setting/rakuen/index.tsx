/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 12:54:21
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Rakuen({ navigation, filter }) {
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
