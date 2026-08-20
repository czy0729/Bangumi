/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:04:36
 */
import React, { memo } from 'react'
import { View } from 'react-native'
import { Text } from '../../../text'
import { Touchable } from '../../../touchable'

import type { Props } from './types'

/**
 * 长按菜单
 */
function Menu({ menus, menuContext, pagerStyles, handleLeaveMenu, handleSaveToLocal }: Props) {
  if (menus) {
    return (
      <View style={pagerStyles.menuContainer}>
        {menus({
          cancel: handleLeaveMenu,
          saveToLocal: handleSaveToLocal
        })}
      </View>
    )
  }

  return (
    <View style={pagerStyles.menuContainer}>
      <View style={pagerStyles.menuShadow} />
      <View style={pagerStyles.menuContent}>
        <Touchable style={pagerStyles.operateContainer} useRN onPress={handleSaveToLocal}>
          <Text style={pagerStyles.operateText} type='sub'>
            {menuContext?.saveToLocal}
          </Text>
        </Touchable>
        <Touchable style={pagerStyles.operateContainer} useRN onPress={handleLeaveMenu}>
          <Text style={pagerStyles.operateText} type='sub'>
            {menuContext?.cancel}
          </Text>
        </Touchable>
      </View>
    </View>
  )
}

export default memo(Menu)
