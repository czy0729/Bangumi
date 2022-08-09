/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-09 10:57:05
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import TabBarLeft from '../tab-bar-left'
import FixedToolBar from '../fixed-tool-bar'
import Label from '../label'
import List from '../list'
import { H_HEADER, H_TABBAR, TABS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

class Tab extends React.Component<Props> {
  onIndexChange = (index: number) => {
    const { $ }: Ctx = this.context
    const { onIndexChange } = this.props
    onIndexChange()
    $.onChange(index)
  }

  onSelect = (title: string) => {
    const { onSelectSubjectType } = this.props
    onSelectSubjectType(title)
  }

  renderScene = SceneMap(
    Object.assign(
      {},
      ...TABS.map((item, index) => ({
        [item.key]: () => (
          <List
            page={index}
            title={item.title}
            ListHeaderComponent={
              <>
                <View
                  style={{
                    height: _.parallaxImageHeight + H_TABBAR - _.radiusLg
                  }}
                />
                <FixedToolBar page={index} onToggleList={this.props.onToggleList} />
              </>
            }
            scrollEventThrottle={16}
            onScroll={this.props.onScroll}
          />
        )
      }))
    )
  )

  get navigationState() {
    const { $ }: Ctx = this.context
    const { page } = $.state
    return {
      index: page,
      routes: TABS
    }
  }

  get transform() {
    const { scrollY } = this.props
    return {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [
              -_.parallaxImageHeight,
              0,
              _.parallaxImageHeight - H_HEADER,
              _.parallaxImageHeight
            ],
            outputRange: [
              _.parallaxImageHeight * 2,
              _.parallaxImageHeight,
              H_HEADER,
              H_HEADER
            ]
          })
        }
      ]
    }
  }

  renderLabel = ({ route, focused }) => <Label title={route.title} focused={focused} />

  renderTabBar = props => {
    return (
      <Animated.View style={[this.styles.tabBarWrap, this.transform]}>
        <TabBar
          {...props}
          style={this.styles.tabBar}
          tabStyle={this.styles.tab}
          labelStyle={this.styles.label}
          indicatorStyle={this.styles.indicator}
          pressOpacity={1}
          pressColor='transparent'
          scrollEnabled
          renderLabel={this.renderLabel}
        />
        <FixedToolBar fixed />
        <Heatmap right={_.wind + 62} id='我的.标签页切换' transparent />
        <Heatmap right={_.wind} id='我的.标签页点击' transparent />
      </Animated.View>
    )
  }

  render() {
    global.rerender('User.Tab')

    return (
      <>
        <TabView
          key={_.orientation}
          lazy
          lazyPreloadDistance={0}
          navigationState={this.navigationState}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onSwipeStart={this.props.onSwipeStart}
          onIndexChange={this.onIndexChange}
        />
        <Animated.View style={[this.styles.tabBarLeft, this.transform]}>
          <TabBarLeft onSelect={this.onSelect} />
        </Animated.View>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Tab)
