/*
 * @Author: czy0729
 * @Date: 2019-04-24 13:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 16:58:01
 */
import React from 'react'
import { DrawerActions } from 'react-navigation-drawer'
import { Touchable, Iconfont } from '@components'
import _ from '@styles'

function IconMenu({ style, navigation }) {
  return (
    <Touchable
      style={style}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
    >
      <Iconfont
        style={{ marginLeft: 10 }}
        name='menu'
        color={_.colorTitle}
        size={22}
      />
    </Touchable>
  )
}

export default IconMenu
