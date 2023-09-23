/*
 * @Author: czy0729
 * @Date: 2022-04-01 03:05:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 13:51:43
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
  const { name, ip, port, sharedFolder, webDAV } = smb
  return (
    <>
      <Flex style={styles.container}>
        <Flex.Item>
          <Popover data={$.smbs.map(item => item.name)} onSelect={$.onSwitch}>
            <Flex>
              <Text size={18} bold>
                {name || ip}
              </Text>
              <Iconfont name='md-arrow-drop-down' color={_.colorDesc} />
            </Flex>
          </Popover>
          <Text size={12} type='sub' bold lineHeight={18} numberOfLines={2}>
            [{webDAV ? 'webDAV' : 'SMB'}] {ip}
            {!!port && `:${port}`}
            {!!sharedFolder && `/${sharedFolder}`}
          </Text>
        </Flex.Item>
        <Popover
          style={[styles.popover, styles.more]}
          data={ACTIONS_SMB}
          onSelect={title => $.onSelectSMB(title, navigation)}
        >
          <Iconfont name='md-more-vert' color={_.colorDesc} />
        </Popover>
      </Flex>
      <ToolBar />
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
    </>
  )
}

export default obc(Top)
