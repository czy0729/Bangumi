/*
 * @Author: czy0729
 * @Date: 2022-04-01 03:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 15:37:30
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Loading } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ToolBar from '../tool-bar'
import Servers from '../servers'
import { ACTIONS_SMB } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Top(props, { $, navigation }: Ctx) {
  const smb = $.current?.smb
  if (!smb) return null

  const styles = memoStyles()
  const { loading } = $.state
  return (
    <View style={styles.top}>
      <Flex style={styles.container}>
        <Flex.Item flex={0.5}>
          <Servers store={$} />
        </Flex.Item>
        <Flex.Item>
          <ToolBar />
        </Flex.Item>
        <Flex.Item flex={0.5}>
          <Flex justify='end'>
            <Popover
              style={[styles.popover, styles.more]}
              data={ACTIONS_SMB}
              onSelect={title => $.onSelectSMB(title, navigation)}
            >
              <Iconfont name='md-more-vert' color={_.colorDesc} />
            </Popover>
          </Flex>
        </Flex.Item>
      </Flex>
      {!!loading && (
        <Flex style={_.mb.sm} justify='center'>
          <View style={styles.loading}>
            <Loading.Raw size='small' color={_.colorSub} />
          </View>
          <Text style={_.ml.sm} size={12} type='sub'>
            正在刷新条目数据 {loading}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default obc(Top)
