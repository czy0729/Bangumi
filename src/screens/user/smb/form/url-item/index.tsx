/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:55:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 06:14:04
 */
import React from 'react'
import { Alert } from 'react-native'
import { Flex, Text, Input } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { s2tAsync } from '@utils/async'
import { Ctx } from '../../types'
import { styles } from './styles'
import { STORYBOOK } from '@constants'

function UrlItem({ connectRef }, { $ }: Ctx) {
  const { url } = $.state
  return (
    <Flex style={_.mt.sm} align='start'>
      <Flex style={styles.label}>
        <Text size={12}>跳转</Text>
        <IconTouchable
          style={_.ml._xs}
          name='md-info-outline'
          size={14}
          onPress={() => {
            Alert.alert(
              s2tAsync('自定义跳转'),
              s2tAsync(`自定义第三方跳转规则。点击文件复制地址，长按跳转。
                    \n[IP] = 主机:端口\n[USERNAME] = 用户\n[PASSWORD] = 密码\n[PATH] = 目录路径\n[FILE] = 文件路径
                    \n若使用 SMB 务必使用 smb:// 开头，webDAV 务必使用 http | https:// 开头
                    \n推荐播放安装 VLC，直接使用 smb:// 能播；其次推荐 nPlayer，支持 nplayer-smb:// 前缀的直接跳转。\n目前已知只有 smb 1.0 协议可以直接播放，2.0会被强制关闭连接，待解决。`),
              [
                {
                  text: s2tAsync('已知问题和详细教程'),
                  onPress: () => {
                    open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')
                  }
                },
                {
                  text: s2tAsync('确定'),
                  onPress: () => {}
                }
              ]
            )
          }}
        />
      </Flex>
      <Flex.Item>
        {STORYBOOK ? (
          <Input
            ref={connectRef}
            style={styles.input}
            defaultValue={url}
            showClear
            returnKeyType='done'
            returnKeyLabel='新增'
            onChangeText={text => $.onChange('url', text)}
          />
        ) : (
          <Input
            ref={connectRef}
            style={[styles.input, styles.inputMultiline]}
            inputStyle={styles.multilineInputStyle}
            defaultValue={url}
            showClear
            multiline
            numberOfLines={3}
            textAlignVertical='top'
            returnKeyType='done'
            returnKeyLabel='新增'
            onChangeText={text => $.onChange('url', text)}
          />
        )}
      </Flex.Item>
    </Flex>
  )
}

export default obc(UrlItem)
