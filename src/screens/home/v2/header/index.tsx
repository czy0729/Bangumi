/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:59:18
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { IconNotify, IconTabsHeader, LogoHeader } from '@_'
import { _, systemStore, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MenuItemType } from '@screens/discovery/index/types'
import { Paths } from '@types'
import { Ctx } from '../types'
import { MENU_MAP } from '../../../discovery/index/ds'
import { COMPONENT, EVENT, IGNORE_PATHS } from './ds'
import { styles } from './styles'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { homeTopLeftCustom, homeTopRightCustom } = systemStore.setting
    const leftItem = MENU_MAP[homeTopLeftCustom]
    const rightItem = MENU_MAP[homeTopRightCustom]

    const handleItemPress = (item: MenuItemType) => {
      if (!IGNORE_PATHS.includes(item.key as any)) {
        if (item.key === 'Search') {
          navigation.push('Search', {
            type: $.tabsLabel !== '全部' && $.tabs.length >= 2 ? $.tabsLabel : ''
          })
        } else {
          navigation.push(item.key as Paths)
        }

        t('首页.跳转', {
          to: item.key
        })
      }
    }

    const renderIcon = (item: MenuItemType, isRight = false) => (
      <IconTabsHeader
        style={isRight ? styles.iconRight : styles.icon}
        name={item.icon}
        text={item.text}
        size={(item.size || 23) - 1}
        onPress={() => handleItemPress(item)}
      />
    )

    return (
      <LogoHeader
        navigation={navigation}
        left={
          <IconNotify style={styles.icon} navigation={navigation} event={EVENT}>
            <Heatmap right={-39} id='首页.跳转' to='Notify' alias='电波提醒' />
            <Heatmap right={-92} id='其他.切换主题' transparent />
          </IconNotify>
        }
        right={
          <Flex style={_.mr.xs}>
            {leftItem && renderIcon(leftItem)}
            {rightItem && renderIcon(rightItem, true)}
          </Flex>
        }
      />
    )
  })
}

export default Header
