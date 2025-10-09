/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 06:06:48
 */
import React from 'react'
import { Flex } from '@components'
import { IconNotify, IconTabsHeader, IconTinygrail } from '@_'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function Icons() {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => (
    <Flex style={styles.icons}>
      <IconNotify style={styles.notify} navigation={navigation} event={EVENT} />
      {systemStore.setting.tinygrail ? (
        <IconTinygrail style={styles.icon} navigation={navigation} event={EVENT} />
      ) : (
        <IconTabsHeader
          style={styles.icon}
          name='md-search'
          onPress={() => {
            navigation.push('Search')

            t('首页.跳转', {
              to: 'Search'
            })
          }}
        />
      )}
    </Flex>
  ))
}

export default Icons
