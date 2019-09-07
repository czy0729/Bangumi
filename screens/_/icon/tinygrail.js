/*
 * 小圣杯图标
 * @Author: czy0729
 * @Date: 2019-09-07 15:58:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 16:20:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import _ from '@styles'
import IconTabsHeader from './tabs-header'

function IconTinygrail({ style, navigation, color }) {
  const { tinygrail } = systemStore.setting
  if (tinygrail) {
    return (
      <IconTabsHeader
        style={style}
        name='trophy-full'
        color={_.colorYellow}
        onPress={() => navigation.push('TinygrailOverview')}
      />
    )
  }

  return (
    <IconTabsHeader
      style={style}
      name='calendar'
      color={color}
      onPress={() => navigation.push('Calendar')}
    />
  )
}

IconTinygrail.defaultProps = {
  navigation: undefined,
  color: undefined
}

export default observer(IconTinygrail)
