/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:52:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { URL_PRIVACY } from '@constants'
import { TEXTS } from '../ds'

import type { Props } from './types'

/** 隐私保护政策 */
function Privacy({ navigation, filter, setFalse }: Props) {
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
            url: URL_PRIVACY,
            title: '隐私保护政策'
          })
        }, 240)

        t('设置.跳转', {
          title: '隐私保护政策',
          to: 'Privacy'
        })
      }}
      {...TEXTS.privacy}
    >
      <Heatmap id='设置.跳转' to='Privacy' alias='隐私保护政策' />
    </ItemSetting>
  )
}

export default observer(Privacy)
