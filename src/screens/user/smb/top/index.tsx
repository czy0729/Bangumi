/*
 * @Author: czy0729
 * @Date: 2022-04-01 03:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 10:48:49
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Loading } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ToolBar from '../tool-bar'
import { ACTIONS_SMB } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Top(props, { $, navigation }: Ctx) {
  const smb = $.current?.smb
  if (!smb) return null

  const styles = memoStyles()
  const { loading } = $.state
  const { name, ip, sharedFolder } = smb
  return (
    <View style={styles.top}>
      <Flex style={styles.container}>
        <Flex.Item flex={0.5}>
          <Popover
            data={$.smbs.map((item, index) => item.name || `未命名服务 ${index + 1}`)}
            onSelect={$.onSwitch}
          >
            <Flex>
              <Text bold numberOfLines={1}>
                {name || ip || '未命名服务'}
              </Text>
              <Iconfont name='md-arrow-drop-down' color={_.colorDesc} />
            </Flex>
          </Popover>
          <Text size={12} type='sub' bold lineHeight={14} numberOfLines={1}>
            {sharedFolder}
          </Text>
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
