/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 05:08:06
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { URL_ZHINAN } from '@constants'
import { TEXTS } from '../ds'

/** 使用指南 */
function AppZhinan({ navigation, filter, setFalse }) {
  return useObserver(() => (
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
  ))
}

export default AppZhinan
