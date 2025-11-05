/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:59:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:01:55
 */
import React from 'react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Footer() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Flex style={_.mt.lg} justify='center'>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('空间.跳转', {
            to: 'User'
          })

          $.navigateToUser(navigation)
        }}
      >
        <Text type='sub' size={12} bold>
          查看TA的所有收藏
        </Text>
        <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
      </Touchable>
      <Text style={styles.touch} type='sub'>
        ·
      </Text>
      <Touchable
        style={styles.touch}
        onPress={() => {
          systemStore.switchSetting('zoneCollapse')
        }}
      >
        <Text type='sub' size={12} bold>
          自动折叠 [{systemStore.setting.zoneCollapse ? '开' : '关'}]
        </Text>
        <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
      </Touchable>
    </Flex>
  )
}

export default ob(Footer)
