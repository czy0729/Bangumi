/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-16 20:16:54
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Heatmap } from '@components'
import { IconTabsHeader, Header as CompHeader } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import More from './more'

function Header(props, { $, navigation }) {
  return (
    <CompHeader
      renderLeft={
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
      }
      renderRight={
        <Flex>
          <IconTabsHeader
            style={styles.search}
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
          <More style={_.ml.sm} />
        </Flex>
      }
    />
  )
}

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const styles = StyleSheet.create({
  icon: {
    marginBottom: 0
  },
  search: {
    marginRight: -10,
    marginBottom: 0
  }
})
