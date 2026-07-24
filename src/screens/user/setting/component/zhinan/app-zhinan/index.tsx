/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:52:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { URL_ZHINAN } from '@constants'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 使用指南 */
function AppZhinan({ navigation, filter, setFalse }: Props) {
  return (
    <ItemSetting
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '个人设置',
          to: 'Zhinan'
        })

        setFalse()
        setTimeout(() => {
          navigation.push('WebBrowser', {
            url: URL_ZHINAN,
            title: '使用指南'
          })
        }, 240)
      }}
      {...TEXTS.zhinan}
    >
      <Heatmap id='设置.跳转' to='Zhinan' alias='个人设置' />
    </ItemSetting>
  )
}

export default observer(AppZhinan)
