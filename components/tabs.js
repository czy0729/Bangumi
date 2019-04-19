/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 14:21:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { colorMain, colorPlain, radiusSm } from '@styles'
import AntdTabs from './@ant-design/tabs'

const Tabs = ({
  tabs,
  tabBarBackgroundColor,
  tabBarUnderlineStyle,
  prerenderingSiblingsNumber,
  renderTabBarLeft,
  children,
  ...other
}) => (
  <AntdTabs
    tabs={tabs}
    tabBarBackgroundColor={tabBarBackgroundColor}
    tabBarUnderlineStyle={[styles.tabBarUnderline, tabBarUnderlineStyle]}
    prerenderingSiblingsNumber={prerenderingSiblingsNumber}
    renderTabBarLeft={renderTabBarLeft}
    {...other}
  >
    {children}
  </AntdTabs>
)

Tabs.defaultProps = {
  tabs: [],
  prerenderingSiblingsNumber: 0,
  tabBarBackgroundColor: colorPlain,
  tabBarUnderlineStyle: undefined,
  renderTabBarLeft: undefined // 导航栏左边插入
}

export default Tabs

const styles = StyleSheet.create({
  tabBarUnderline: {
    backgroundColor: colorMain,
    borderRadius: radiusSm
  }
})
