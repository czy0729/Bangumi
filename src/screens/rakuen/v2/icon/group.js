/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 19:57:42
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'

function IconGroup(props, { $, navigation }) {
  return (
    <IconTabsHeader
      style={styles.icon}
      name='app'
      onPress={() => {
        if (!$.isWebLogin) {
          info('请先登录')
          return
        }

        t('超展开.跳转', {
          to: 'Mine'
        })

        navigation.push('Mine')
      }}
    >
      <Heatmap
        right={-40}
        id='超展开.跳转'
        data={{
          to: 'Mine',
          alias: '我的小组'
        }}
      />
    </IconTabsHeader>
  )
}

export default obc(IconGroup)

const styles = _.create({
  icon: {
    marginBottom: 0
  }
})
