/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 19:59:19
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconSearch(props, { navigation }) {
  return (
    <IconTabsHeader
      style={styles.icon}
      name='search'
      onPress={() => {
        t('超展开.跳转', {
          to: 'RakuenSearch'
        })

        navigation.push('RakuenSearch')
      }}
    >
      <Heatmap
        right={36}
        bottom={9}
        id='超展开.跳转'
        data={{
          to: 'RakuenSearch',
          alias: '搜索'
        }}
      />
    </IconTabsHeader>
  )
}

export default obc(IconSearch)

const styles = _.create({
  icon: {
    marginRight: -10,
    marginBottom: 0
  }
})
