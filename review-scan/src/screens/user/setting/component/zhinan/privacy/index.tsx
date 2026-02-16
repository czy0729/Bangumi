/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:14:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 05:14:44
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { URL_PRIVACY } from '@constants'
import { TEXTS } from '../ds'

/** 隐私保护政策 */
function Privacy({ navigation, filter, setFalse }) {
  return useObserver(() => (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        t('设置.跳转', {
          title: '隐私保护政策',
          to: 'Privacy'
        })

        setFalse()
        setTimeout(() => {
          navigation.push('WebBrowser', {
            url: URL_PRIVACY,
            title: '隐私保护政策'
          })
        }, 240)
      }}
      {...TEXTS.privacy}
    >
      <Heatmap id='设置.跳转' to='Privacy' alias='隐私保护政策' />
    </ItemSetting>
  ))
}

export default Privacy
