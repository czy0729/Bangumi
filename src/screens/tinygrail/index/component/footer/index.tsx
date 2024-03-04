/*
 * @Author: czy0729
 * @Date: 2021-05-04 16:25:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:25:44
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TINYGRAIL_UPDATES_LOGS_URL, VERSION_TINYGRAIL_PLUGIN } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Footer(props, { $, navigation }: Ctx) {
  return (
    <Flex style={_.mb.md} justify='center'>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'Topic',
            title: '更新内容'
          })

          appNavigate(TINYGRAIL_UPDATES_LOGS_URL, navigation)
        }}
      >
        <Text type='tinygrailText' size={12}>
          {VERSION_TINYGRAIL_PLUGIN} 更新内容
        </Text>
      </Touchable>
      <Text type='tinygrailText'>·</Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'Topic',
            title: '游戏指南'
          })

          navigation.push('Topic', {
            topicId: 'group/358232'
          })
        }}
      >
        <Text type='tinygrailText' size={12}>
          游戏wiki
        </Text>
      </Touchable>
      <Text type='tinygrailText'>·</Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'Group',
            title: '小组讨论 '
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
      <Touchable style={styles.touch} onPress={$.doSend}>
        <Text type='tinygrailText' size={12}>
          点我看看
        </Text>
      </Touchable>
    </Flex>
  )
}

export default obc(Footer, COMPONENT)
