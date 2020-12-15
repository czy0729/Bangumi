/*
 * 小圣杯图标
 * @Author: czy0729
 * @Date: 2019-09-07 15:58:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 20:55:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import IconTabsHeader from './tabs-header'

function IconTinygrail({ style, navigation, color, event }) {
  const { tinygrail } = systemStore.setting
  if (tinygrail) {
    return (
      <IconTabsHeader
        style={style}
        name='trophy'
        color={_.colorDesc}
        onPress={() => {
          const { id, data } = event
          t(id, {
            to: 'Tinygrail',
            ...data
          })
          navigation.push('Tinygrail')
        }}
      >
        <Heatmap
          right={52}
          id='首页.跳转'
          data={{
            to: 'Tinygrail',
            alias: '小圣杯'
          }}
          transparent
        />
      </IconTabsHeader>
    )
  }

  return (
    <IconTabsHeader
      style={style}
      name='calendar'
      color={color}
      onPress={() => {
        const { id, data } = event
        t(id, {
          to: 'Calendar',
          ...data
        })
        navigation.push('Calendar')
      }}
    />
  )
}

IconTinygrail.defaultProps = {
  event: EVENT
}

export default observer(IconTinygrail)
