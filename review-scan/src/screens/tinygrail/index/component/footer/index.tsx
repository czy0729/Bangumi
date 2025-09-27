/*
 * @Author: czy0729
 * @Date: 2021-05-04 16:25:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-17 23:57:30
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { alert, feedback, info, open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Footer() {
  const navigation = useNavigation()
  return (
    <Flex style={_.mv.sm} justify='center'>
      {/* <View style={styles.touch}>
        <Text type='tinygrailText' size={12}>
          {VERSION_TINYGRAIL_PLUGIN}
        </Text>
      </View>
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text> */}
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
      {!WEB && (
        <>
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
        </>
      )}
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'TinygrailAdvance',
            title: '高级功能'
          })

          navigation.push('TinygrailAdvance')
        }}
      >
        <Text type='tinygrailText' size={12}>
          高级功能
        </Text>
      </Touchable>
      <Text style={styles.split} type='tinygrailText'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('小圣杯.跳转', {
            to: 'TinygrailLotteryRank',
            title: '刮刮乐榜单'
          })

          navigation.push('TinygrailLotteryRank')
        }}
      >
        <Text type='tinygrailText' size={12}>
          刮刮乐日榜
        </Text>
      </Touchable>
    </Flex>
  )
}

export default ob(Footer, COMPONENT)
