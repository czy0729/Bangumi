/*
 * @Author: czy0729
 * @Date: 2024-01-07 17:41:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 22:38:33
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Loading, RenderHtml, Text } from '@components'
import { _ } from '@stores'
import { appNavigate, open, stl } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Content(props, { $, navigation }: Ctx) {
  if (!$.users._loaded) return <Loading />

  // 去除 APP 高清头像背景的代码
  const sign =
    String($.users.sign || '').replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(没有填写简介)'

  const { networkService } = $.users
  return (
    <View style={_.mt.md}>
      {!!networkService?.length && (
        <>
          <Flex style={styles.service} wrap='wrap'>
            {networkService.map(item => (
              <Flex key={item.label} style={styles.item}>
                <View
                  style={stl(
                    styles.badge,
                    item.color && {
                      backgroundColor: item.color
                    }
                  )}
                >
                  <Text size={10} bold shadow>
                    {item.label}
                  </Text>
                </View>
                <Text
                  size={11}
                  bold
                  onPress={
                    item.href
                      ? () => {
                          open(item.href)
                        }
                      : undefined
                  }
                >
                  {item.value}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Divider />
        </>
      )}
      <RenderHtml
        html={sign}
        onLinkPress={href => {
          appNavigate(
            href,
            navigation,
            {},
            {
              id: '空间.跳转',
              data: {
                from: '关于TA',
                userId: $.userId
              }
            }
          )
        }}
      />
    </View>
  )
}

export default obc(Content, COMPONENT)
