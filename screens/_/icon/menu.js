/*
 * @Author: czy0729
 * @Date: 2019-04-24 13:41:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-10 17:17:47
 */
import React from 'react'
import { DrawerActions } from 'react-navigation-drawer'
import { Touchable, Iconfont } from '@components'
import _ from '@styles'

const IconMenu = ({ style, navigation }) => (
  <Touchable
    style={style}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  >
    <Iconfont
      style={{ marginLeft: 8 }}
      name='menu'
      color={_.colorTitle}
      size={24}
    />
  </Touchable>
)

export default IconMenu
