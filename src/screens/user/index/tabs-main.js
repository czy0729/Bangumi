/*
 * @Author: czy0729
 * @Date: 2020-04-21 19:25:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 22:13:33
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import Tabs from './tabs'
import List from './list'
import ToolBar from './tool-bar'
import { tabs, height } from './store'

const ListHeaderComponent = (
  <>
    <View
      style={{
        height: height + _.tabsHeight
      }}
    />
    <ToolBar />
  </>
)

function TabsMain(
  { scrollY, onSelectSubjectType, onTabsChange, onScroll },
  { $ }
) {
  const { subjectType } = $.state
  return (
    <Tabs
      $={$}
      scrollY={scrollY}
      onSelect={onSelectSubjectType}
      onChange={onTabsChange}
    >
      {tabs.map(item => (
        <List
          key={item.title}
          title={item.title}
          subjectType={subjectType}
          ListHeaderComponent={ListHeaderComponent}
          scrollEventThrottle={16}
          onScroll={onScroll}
        />
      ))}
    </Tabs>
  )
}

TabsMain.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(TabsMain)
