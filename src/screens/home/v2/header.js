/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-05 21:19:54
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, ScrollToTop } from '@components'
import { Logo, IconNotify, IconTinygrail, IconTabsHeader } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS } from '@constants'

const event = {
  id: '首页.跳转'
}

function Header({ isFocused }, { $, navigation }) {
  return (
    <Flex style={styles.header}>
      <ScrollToTop
        isFocused={isFocused}
        onPress={() => ScrollToTop.scrollToTop($.listViewFns[$.title])}
      />
      <Flex style={styles.icons}>
        <IconNotify
          style={[styles.icon, _.mr.sm]}
          navigation={navigation}
          event={event}
        />
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
