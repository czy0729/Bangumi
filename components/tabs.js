/*
 * 标签页
 * @Doc: https://rn.mobile.ant.design/components/tabs-cn/
 * @Author: czy0729
 * @Date: 2019-04-14 00:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-24 17:53:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IOS } from '@constants'
import _ from '@styles'
import AntdTabs from './@/ant-design/tabs'

function Tabs({
  tabs,
  tabBarBackgroundColor,
  tabBarUnderlineStyle,
  prerenderingSiblingsNumber,
  renderTabBarLeft,
  children,
  ...other
}) {
  // iOS最左边加入一个块, 使得可以手势退后
  return (
    <>
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
      {IOS && children && <View style={styles.block} />}
    </>
  )
}

Tabs.defaultProps = {
  tabs: [],
  prerenderingSiblingsNumber: 0,
  tabBarBackgroundColor: 'transparent',
  tabBarUnderlineStyle: undefined,
  renderTabBarLeft: undefined // 导航栏左边插入
}

export default Tabs

const styles = StyleSheet.create({
  tabBarUnderline: {
    backgroundColor: _.colorMain,
    borderRadius: _.radiusSm,
    transform: [{ scaleX: 0.5 }]
  },
  block: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: _.wind
  }
})
