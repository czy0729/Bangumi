/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:10:22
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { Logo, IconNotify, IconTinygrail, IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

const event = {
  id: '首页.跳转'
}

function Header(props, { navigation }) {
  return (
    <Flex style={styles.header}>
      <Flex style={styles.icons}>
        <IconNotify
          style={[styles.icon, _.mr.sm]}
          navigation={navigation}
          event={event}
        >
          <Heatmap
            right={-39}
            id='首页.跳转'
            data={{
              to: 'Notify',
              alias: '电波提醒'
            }}
          />
          <Heatmap right={-92} id='其他.切换主题' transparent />
        </IconNotify>
      </Flex>
      <Flex.Item>
        <Flex style={styles.logo} justify='center'>
          <Logo />
        </Flex>
      </Flex.Item>
      <Flex style={styles.icons} justify='end'>
        <IconTinygrail
          style={styles.icon}
          navigation={navigation}
          event={event}
        />
        <IconTabsHeader
          style={styles.icon}
          name='search'
          onPress={() => {
            t('首页.跳转', {
              to: 'Search'
            })
            navigation.push('Search')
          }}
        >
          <Heatmap
            id='首页.跳转'
            data={{
              to: 'Search',
              alias: '搜索'
            }}
          />
          <Heatmap
            right={88}
            bottom={-32}
            id='首页.跳转'
            data={{
              to: 'Calendar',
              alias: '每日放送'
            }}
            transparent
          />
        </IconTabsHeader>
      </Flex>
    </Flex>
  )
}

export default obc(Header)

const styles = _.create({
  header: {
    position: 'absolute',
    zIndex: 3,
    top: _.statusBarHeight - (IOS ? 6 : -2),
    right: 0,
    left: 0,
    paddingHorizontal: _.sm
  },
  logo: {
    width: '100%'
  },
  icons: {
    width: 80
  },
  icon: {
    marginBottom: 0
  }
})
