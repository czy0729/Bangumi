/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:59:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 17:03:30
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _, systemStore, useStore } from '@stores'
import { feedback } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_SPLIT_LEFT, TEXT_MENU_SPLIT_RIGHT } from '@constants'
import { styles } from './styles'

import type { Ctx } from '../../../types'
function Footer() {
  const { $, navigation } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    $.navigateToUser(navigation)

    t('空间.跳转', {
      to: 'User'
    })
  }, [$, navigation])

  return useObserver(() => {
    const { zoneCollapse, zoneAlignCenter } = systemStore.setting

    const memoData = useMemo(
      () =>
        [
          `自动折叠${TEXT_MENU_SPLIT_LEFT}${zoneCollapse ? '开' : '关'}${TEXT_MENU_SPLIT_RIGHT}`,
          `标题居中${TEXT_MENU_SPLIT_LEFT}${zoneAlignCenter ? '开' : '关'}${TEXT_MENU_SPLIT_RIGHT}`
        ] as const,
      [zoneAlignCenter, zoneCollapse]
    )

    const handleSelect = useCallback((title: string) => {
      if (title.includes('自动折叠')) {
        systemStore.switchSetting('zoneCollapse')
        feedback(true)
      } else if (title.includes('标题居中')) {
        systemStore.switchSetting('zoneAlignCenter')
        feedback(true)
      }
    }, [])

    return (
      <Flex style={_.mt.lg} justify='center'>
        <Touchable style={styles.touch} onPress={handlePress}>
          <Text type='sub' bold>
            查看TA的所有收藏
          </Text>
          <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
        </Touchable>

        <View style={styles.settings}>
          <Popover data={memoData} onSelect={handleSelect}>
            <Flex style={styles.icon}>
              <Iconfont name='icon-setting' size={16} />
            </Flex>
          </Popover>
        </View>
      </Flex>
    )
  })
}

export default Footer
