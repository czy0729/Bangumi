/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Loading, Text } from '@components'
import { IconTouchable } from '@_/icon'
import { _ } from '@stores'
import { lastDate } from '@utils'
import { styles } from './styles'

import type { Props } from './types'

/** 锐评工具栏 */
function ToolBar({ time, loading, onBefore, onNext, onRefresh }: Props) {
  return (
    <Flex style={styles.toolBar}>
      <Flex.Item>
        <Flex>
          <IconTouchable
            name='md-navigate-before'
            size={24}
            color='rgba(255, 255, 255, 0.64)'
            onPress={onBefore}
          />
          <IconTouchable
            style={_.ml.sm}
            name='md-navigate-next'
            size={24}
            color='rgba(255, 255, 255, 0.64)'
            onPress={onNext}
          />
        </Flex>
      </Flex.Item>
      {!!time && typeof time === 'number' && (
        <Text style={styles.time} type='__plain__' size={12} bold shadow align='right'>
          {lastDate(time)}
        </Text>
      )}
      {loading ? (
        <View style={_.mh.sm}>
          <Loading.Medium color='rgba(255, 255, 255, 0.8)' />
        </View>
      ) : (
        <IconTouchable
          name='md-refresh'
          size={20}
          color='rgba(255, 255, 255, 0.64)'
          onPress={onRefresh}
        />
      )}
    </Flex>
  )
}

export default observer(ToolBar)