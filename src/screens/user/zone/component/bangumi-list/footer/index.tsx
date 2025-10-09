/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:59:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:57:17
 */
import React from 'react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _, systemStore, useStore } from '@stores'
import { feedback } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Footer() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => (
    <>
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
          <Text type='sub' bold>
            查看TA的所有收藏
          </Text>
          <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
        </Touchable>
      </Flex>
      <Flex style={styles.settings} justify='end'>
        <Touchable
          style={styles.touch}
          onPress={() => {
            systemStore.switchSetting('zoneCollapse')

            feedback(true)
          }}
        >
          <Text type='sub' size={11} bold>
            关联设置：自动折叠 [{systemStore.setting.zoneCollapse ? '开' : '关'}]
          </Text>
          <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
        </Touchable>
      </Flex>
    </>
  ))
}

export default Footer
