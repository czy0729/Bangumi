/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { IconTvPlay } from '../icons'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 自定义源头 */
function Origin({ filter }: WithFilterProps) {
  r(COMPONENT)

  const navigation = useNavigation()
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <ItemSetting
      icon={<IconTvPlay />}
      arrow
      highlight
      filter={filter}
      onPress={() => {
        setTimeout(() => {
          navigation.push('OriginSetting')
        }, 80)

        t('设置.跳转', {
          title: '自定义源头',
          to: 'OriginSetting'
        })
      }}
      {...TEXTS.origin}
    >
      <Heatmap id='设置.跳转' to='OriginSetting' alias='自定义源头' />
    </ItemSetting>
  )
}

export default observer(Origin)
