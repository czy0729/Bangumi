/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:17:16
 */
import React from 'react'
import { Flex } from '@components'
import { IconNotify, IconTinygrail, IconTabsHeader } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
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

export default obc(Icons)

const styles = _.create({
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
