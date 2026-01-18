/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:48:33
 */
import React from 'react'
import { Flex, Heatmap, Touchable } from '@components'
import { IconMenu, IconNotify, LogoHeader } from '@_'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MENU_MAP } from '@constants'
import { COMPONENT, EVENT, IGNORE_PATHS } from './ds'
import { styles } from './styles'

import type { MenuItem, Paths } from '@types'
import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { homeTopLeftCustom, homeTopRightCustom } = systemStore.setting
    const leftItem = MENU_MAP[homeTopLeftCustom]
    const rightItem = MENU_MAP[homeTopRightCustom]

    const handleItemPress = (item: MenuItem) => {
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

    const renderIcon = (item: MenuItem, isRight = false) => (
      <Touchable
        style={stl(styles.icon, !isRight && styles.rightLeft)}
        onPress={() => handleItemPress(item)}
      >
        <IconMenu
          id={item.key}
          icon={item.icon}
          text={item.text}
          size={(item.size || 23) - 1}
          wrap={false}
        />
      </Touchable>
    )

    return (
      <LogoHeader
        navigation={navigation}
        left={
          <IconNotify style={stl(styles.icon, styles.left)} navigation={navigation} event={EVENT}>
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
