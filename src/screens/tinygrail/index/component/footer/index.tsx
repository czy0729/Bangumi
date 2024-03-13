/*
 * @Author: czy0729
 * @Date: 2021-05-04 16:25:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:33:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { alert, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { VERSION_TINYGRAIL_PLUGIN } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Footer(props, { $, navigation }: Ctx) {
  return (
    <Flex style={_.mb.md} justify='center'>
      <View style={styles.touch}>
        <Text type='tinygrailText' size={12}>
          {VERSION_TINYGRAIL_PLUGIN}
        </Text>
      </View>
      <Text type='tinygrailText'>·</Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'Group',
            title: 'QQ群'
          })

          alert('1038257138')
        }}
      >
        <Text type='tinygrailText' size={12}>
          QQ群
        </Text>
      </Touchable>
      <Text type='tinygrailText'>·</Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'Group',
            title: '小组讨论'
          })

          navigation.push('Group', {
            groupId: 'tinygrail'
          })
        }}
      >
        <Text type='tinygrailText' size={12}>
          小组讨论
        </Text>
      </Touchable>
      <Text type='tinygrailText'>·</Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          open('https://fuyuake.top/xsb/chara/all')
        }}
      >
        <Text type='tinygrailText' size={12}>
          fuyuake.top
        </Text>
      </Touchable>
    </Flex>
  )
}

export default obc(Footer, COMPONENT)
