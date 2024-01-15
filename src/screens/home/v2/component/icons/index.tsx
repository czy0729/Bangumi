/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 06:06:26
 */
import React from 'react'
import { Flex } from '@components'
import { IconNotify, IconTabsHeader, IconTinygrail } from '@_'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function Icons(props, { navigation }: Ctx) {
  return (
    <Flex style={styles.icons}>
      <IconNotify style={styles.notify} navigation={navigation} event={EVENT} />
      {systemStore.setting.tinygrail ? (
        <IconTinygrail style={styles.icon} navigation={navigation} event={EVENT} />
      ) : (
        <IconTabsHeader
          style={styles.icon}
          name='md-search'
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

export default obc(Icons, COMPONENT)
