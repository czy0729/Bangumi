/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:24:38
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { Logo, IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { IOS } from '@constants'

function Header(props, { $, navigation }) {
  return (
    <Flex style={styles.header}>
      <Flex style={styles.icons} />
      <Flex.Item>
        <Flex style={styles.logo} justify='center'>
          <Logo />
        </Flex>
      </Flex.Item>
      <Flex style={styles.icons} justify='end'>
        <IconTabsHeader
          style={styles.icon}
          name='add'
          onPress={() => {
            if (!$.isWebLogin) {
              info('请先登录')
              return
            }

            t('时间胶囊.新吐槽')

            navigation.push('Say', {
              onNavigationCallback: $.fetchTimeline
            })
          }}
        >
          <Heatmap id='时间胶囊.新吐槽' />
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
