/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-09 20:16:01
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { Logo, IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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
        />
      </Flex>
    </Flex>
  )
}

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const styles = StyleSheet.create({
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
