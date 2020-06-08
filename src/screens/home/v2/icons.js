/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-02 20:13:03
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { IconNotify, IconTinygrail, IconTabsHeader } from '@screens/_'
import { _, systemStore } from '@stores'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

const event = {
  id: '首页.跳转'
}

function Icons(props, { navigation }) {
  const { tinygrail } = systemStore.setting
  return (
    <Flex style={styles.icons}>
      <IconNotify
        style={[styles.icon, _.mr.sm]}
        navigation={navigation}
        event={event}
      />
      {tinygrail ? (
        <IconTinygrail
          style={styles.icon}
          navigation={navigation}
          event={event}
        />
      ) : (
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
      )}
    </Flex>
  )
}

Icons.contextTypes = {
  navigation: PropTypes.object
}

export default observer(Icons)

const styles = StyleSheet.create({
  icons: {
    position: 'absolute',
    zIndex: 3,
    top: _.statusBarHeight + 4,
    right: _._wind
  },
  icon: {
    marginBottom: 0
  }
})
