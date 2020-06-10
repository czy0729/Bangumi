/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:16:42
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { IconTabsHeader, Header as CompHeader } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import Prefetch from './prefetch'
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
        />
      }
      renderRight={
        <Flex>
          <Prefetch />
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
  }
})
