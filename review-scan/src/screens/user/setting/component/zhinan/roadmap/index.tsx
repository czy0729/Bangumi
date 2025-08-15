/*
 * @Author: czy0729
 * @Date: 2024-04-26 05:09:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 05:11:03
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { URL_DEV } from '@constants'
import { TEXTS } from '../ds'

/** 开发状况 */
function Roadmap({ navigation, filter, setFalse }) {
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
          title: '当前开发中',
          to: 'Notion'
        })

        setFalse()
        setTimeout(() => {
          navigation.push('WebBrowser', {
            url: URL_DEV,
            title: '当前开发中'
          })
        }, 240)
      }}
      {...TEXTS.notion}
    >
      <Heatmap id='设置.跳转' to='Notion' alias='当前开发中' />
    </ItemSetting>
  ))
}

export default Roadmap
