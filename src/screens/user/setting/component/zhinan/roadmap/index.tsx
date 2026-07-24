/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:09:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:54:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { URL_DEV } from '@constants'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 开发状况 */
function Roadmap({ navigation, filter, setFalse }: Props) {
  return (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        setFalse()
        setTimeout(() => {
          navigation.push('WebBrowser', {
            url: URL_DEV,
            title: '当前开发中'
          })
        }, 240)

        t('设置.跳转', {
          title: '当前开发中',
          to: 'Notion'
        })
      }}
      {...TEXTS.notion}
    >
      <Heatmap id='设置.跳转' to='Notion' alias='当前开发中' />
    </ItemSetting>
  )
}

export default observer(Roadmap)
