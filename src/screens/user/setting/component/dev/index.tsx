/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-28 07:40:19
 */
import React from 'react'
import { Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Navigation } from '@types'
import { styles } from './styles'

function Dev({ navigation }: { navigation: Navigation }) {
  return (
    <Flex style={_.mt.lg} justify='center'>
      <IconTouchable
        style={styles.transparent}
        name='md-more-horiz'
        onPress={() => navigation.push('DEV')}
      />
    </Flex>
  )
}

export default ob(Dev)
