/*
 * 标签页
 * @Doc: https://rn.mobile.ant.design/components/tabs-cn/
 * @Author: czy0729
 * @Date: 2019-04-14 00:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:53:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'
import AntdTabs from './@/ant-design/tabs'

export const Tabs = observer(
  ({
    tabs = [],
    tabBarStyle,
    tabBarUnderlineStyle,
    prerenderingSiblingsNumber = 0,
    renderTabBarLeft,
    renderTabBarRight,
    children,
    ...other
  }) => {
    const styles = memoStyles()
    const _tabBarStyle = [tabBarStyle]
    if (!IOS) {
      if (_.isDark) {
        _tabBarStyle.push({
          borderBottomWidth: 0
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
          renderTabBarRight={renderTabBarRight}
          {...other}
        >
          {children}
        </AntdTabs>
        {IOS && children && <View style={styles.touchBlock} />}
      </>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  tabBarUnderline: {
    height: 4,
    backgroundColor: _.colorMain
  },
  touchBlock: {
    position: 'absolute',
    top: 160,
    bottom: 0,
    left: 0,
    width: _.wind
  }
}))
