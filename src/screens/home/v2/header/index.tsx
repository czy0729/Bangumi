/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 17:29:43
 */
import React from 'react'
import { Heatmap } from '@components'
import { LogoHeader, IconNotify, IconTinygrail, IconTabsHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { styles } from './styles'

const EVENT = {
  id: '首页.跳转'
} as const

function Header(props, { navigation }) {
  global.rerender('Home.Header')

  return (
    <LogoHeader
      left={
        <IconNotify style={styles.icon} navigation={navigation} event={EVENT}>
          <Heatmap right={-39} id='首页.跳转' to='Notify' alias='电波提醒' />
          <Heatmap right={-92} id='其他.切换主题' transparent />
        </IconNotify>
      }
      right={
        <>
          <IconTinygrail
            style={[styles.icon, _.mr.xs]}
            navigation={navigation}
            event={EVENT}
          />
          <IconTabsHeader
            style={[styles.icon, _.mr.xs]}
            name='md-search'
            onPress={() => {
              t('首页.跳转', {
                to: 'Search'
              })
              navigation.push('Search')
            }}
          >
            <Heatmap id='首页.跳转' to='Search' alias='搜索' />
            <Heatmap
              right={88}
              bottom={-32}
              id='首页.跳转'
              to='Calendar'
              alias='每日放送'
              transparent
            />
          </IconTabsHeader>
        </>
      }
    />
  )
}

export default obc(Header)
