/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:35:09
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { NavigationProps } from '@types'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 自定义源头 */
function Origin({
  navigation,
  filter
}: NavigationProps<{
  filter: string
}>) {
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
