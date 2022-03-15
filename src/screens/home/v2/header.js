/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 19:54:09
 */
import React from 'react'
import { Heatmap } from '@components'
import { LogoHeader, IconNotify, IconTinygrail, IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const event = {
  id: '首页.跳转'
}

function Header(props, { navigation }) {
  rerender('Home.Header')

  return (
    <LogoHeader
      left={
        <IconNotify
          style={[styles.icon, _.ml.xs]}
          navigation={navigation}
          event={event}
        >
          <Heatmap right={-39} id='首页.跳转' to='Notify' alias='电波提醒' />
          <Heatmap right={-92} id='其他.切换主题' transparent />
        </IconNotify>
      }
      right={
        <>
          <IconTinygrail
            style={[styles.icon, _.mr.xs]}
            navigation={navigation}
            event={event}
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

const styles = _.create({
  icon: {
    marginBottom: 0,
    borderRadius: 40,
    overflow: 'hidden'
  }
})
