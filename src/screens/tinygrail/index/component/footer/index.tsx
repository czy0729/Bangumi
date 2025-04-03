/*
 * @Author: czy0729
 * @Date: 2021-05-04 16:25:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:03:51
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { alert, feedback, info, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { VERSION_TINYGRAIL_PLUGIN } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Footer() {
  const navigation = useNavigation()
  return (
    <Flex style={_.mv.sm} justify='center'>
      <View style={styles.touch}>
        <Text type='tinygrailText' size={12}>
          {VERSION_TINYGRAIL_PLUGIN}
        </Text>
      </View>
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
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
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          open('https://fuyuake.top/xsb/chara/all')
        }}
      >
        <Text type='tinygrailText' size={12}>
          fuyuake
        </Text>
      </Touchable>
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          const { routes } = navigation.getState()
          if (!routes?.length) return

          // 若在首屏操作, 则先推进 Tinygrail 页面再更新设置
          const isFromHomeTab = !routes[0].key.startsWith('HomeTab')
          if (isFromHomeTab) navigation.push('Tinygrail')

          setTimeout(() => {
            const value = systemStore.calcHomeRenderTabs('Tinygrail')
            systemStore.setSetting('homeRenderTabs', value)

            info(value.includes('Tinygrail') ? '已常驻' : '已取消常驻')
            feedback()
          }, 0)
        }}
      >
        <Text type='tinygrailText' size={12}>
          {systemStore.setting.homeRenderTabs.includes('Tinygrail') ? '已' : '启用'}常驻
        </Text>
      </Touchable>
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'TinygrailSearch',
            title: '人物搜索'
          })

          navigation.push('TinygrailSearch')
        }}
      >
        <Text type='tinygrailText' size={12}>
          人物搜索
        </Text>
      </Touchable>
    </Flex>
  )
}

export default ob(Footer, COMPONENT)
