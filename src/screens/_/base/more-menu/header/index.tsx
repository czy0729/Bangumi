/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 抽屉标题栏
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '../../../icon'
import { styles } from './styles'

import type { Props } from './types'

function Header({ all, statusBarHeight, onClose }: Props) {
  return (
    <Flex style={[styles.header, { paddingTop: statusBarHeight + _.md }]}>
      <Text size={16} bold>
        {all ? '全部功能' : '更多功能'}
      </Text>
      <View style={styles.headerContent} />
      <IconTouchable name='md-close' size={20} color={_.colorTitle} onPress={onClose} />
    </Flex>
  )
}

export default observer(Header)
