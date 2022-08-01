/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 10:39:53
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { NavigationProps } from '@types'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Origin({
  navigation,
  filter
}: NavigationProps<{
  filter: string
}>) {
  const shows = getShows(filter, TEXTS)
  if (!shows) return null

  return (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '自定义源头',
          to: 'OriginSetting'
        })

        navigation.push('OriginSetting')
      }}
      {...TEXTS.origin}
    >
      <Heatmap id='设置.跳转' to='OriginSetting' alias='自定义源头' />
    </ItemSetting>
  )
}

export default ob(Origin)
