/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 17:58:15
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Touchable } from '@components'
import { IconMenu, IconNotify, LogoHeader } from '@_'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { MENU_MAP } from '@constants'
import { COMPONENT, EVENT, IGNORE_PATHS } from './ds'
import { styles } from './styles'

import type { MenuItem, Paths } from '@types'
import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { homeTopExtraCustom, homeTopLeftCustom, homeTopRightCustom } = systemStore.setting
  const extraItem = MENU_MAP[homeTopExtraCustom]
  const leftItem = MENU_MAP[homeTopLeftCustom]
  const rightItem = MENU_MAP[homeTopRightCustom]

  const handleItemPress = useCallback(
    (item: MenuItem) => {
      if (!IGNORE_PATHS.includes(item.key as any)) {
        if (item.key === 'Search') {
          navigation.push('Search', {
            type: $.searchType
          })
        } else {
          navigation.push(item.key as Paths)
        }

        t('首页.跳转', {
          to: item.key
        })
      }
    },
    [$, navigation]
  )

  const handleRenderIcon = useCallback(
    (item: MenuItem, isRight = false) => (
      <Touchable
        style={stl(styles.icon, !isRight && styles.rightLeft)}
        onPress={() => handleItemPress(item)}
      >
        <IconMenu
          id={item.key}
          icon={item.icon}
          text={item.text}
          size={item.size || 24}
          wrap={false}
        />
      </Touchable>
    ),
    [handleItemPress]
  )

  const elLeft = useMemo(
    () => (
      <>
        <View>
          <IconNotify style={stl(styles.icon, styles.left)} navigation={navigation} event={EVENT}>
            <Heatmap right={-39} id='首页.跳转' to='Notify' alias='电波提醒' />
            <Heatmap right={-92} id='其他.切换主题' transparent />
          </IconNotify>
        </View>
        {extraItem && handleRenderIcon(extraItem)}
      </>
    ),
    [extraItem, handleRenderIcon, navigation]
  )

  const elRight = useMemo(
    () => (
      <Flex style={_.mr.xs}>
        {leftItem && handleRenderIcon(leftItem)}
        {rightItem && handleRenderIcon(rightItem, true)}
      </Flex>
    ),
    [handleRenderIcon, leftItem, rightItem]
  )

  return <LogoHeader navigation={navigation} left={elLeft} right={elRight} />
}

export default observer(Header)
