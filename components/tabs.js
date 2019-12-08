/*
 * 标签页
 * @Doc: https://rn.mobile.ant.design/components/tabs-cn/
 * @Author: czy0729
 * @Date: 2019-04-14 00:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 21:13:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import AntdTabs from './@/ant-design/tabs'

function Tabs({
  tabs,
  tabBarStyle,
  tabBarUnderlineStyle,
  prerenderingSiblingsNumber,
  renderTabBarLeft,
  children,
  ...other
}) {
  const styles = memoStyles()
  const _tabBarStyle = [tabBarStyle]
  if (!IOS) {
    if (_.isDark) {
      _tabBarStyle.push({
        borderTopColor: _.colorBorder
      })
    }
  }

  // iOS最左边加入一个块, 使得可以手势退后
  return (
    <>
      <AntdTabs
        tabs={tabs}
        tabBarStyle={_tabBarStyle}
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
  tabBarUnderlineStyle: undefined,
  renderTabBarLeft: undefined // 导航栏左边插入
}

export default observer(Tabs)

const memoStyles = _.memoStyles(_ => ({
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
}))
