/*
 * 标签页
 * @Doc: https://rn.mobile.ant.design/components/tabs-cn/
 * @Author: czy0729
 * @Date: 2019-04-14 00:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-30 17:12:50
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
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
  const styles = memoStyles(_.mode)

  // iOS最左边加入一个块, 使得可以手势退后
  return (
    <>
      <AntdTabs
        tabs={tabs}
        tabBarBackgroundColor={tabBarBackgroundColor}
        tabBarUnderlineStyle={[styles.tabBarUnderline, tabBarUnderlineStyle]}
        tabBarActiveTextColor={_.colorDesc}
        tabBarInactiveTextColor={_.colorDesc}
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

export default observer(Tabs)

let _mode
let _styles
function memoStyles(mode) {
  if (!_mode || !_styles || _mode !== mode) {
    _mode = mode
    _styles = StyleSheet.create({
      tabBarUnderline: {
        height: 4,
        backgroundColor: _.colorMain
      },
      block: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: _.wind
      }
    })
  }
  return _styles
}
