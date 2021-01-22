/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:32:38
 */
import React from 'react'
import { View } from 'react-native'
import { StatusBarEvents, ListView, UM, Heatmap } from '@components'
import { IconTabBar, IconPortal } from '@screens/_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import Header from './header'
import List from './list'
import Store from './store'

const title = '发现'

export default
@inject(Store)
@obc
class Discovery extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon,
    tabBarLabel: title
  }

  componentDidMount() {
    runAfter(() => {
      const { $ } = this.context
      $.init()
      hm('discovery', 'Discovery')
    })
  }

  ListHeaderComponent = (<Header />)

  render() {
    const { $ } = this.context
    const { isFocused } = this.props
    return (
      <View style={_.container._plain}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <ListView
          ref={$.connectRef}
          style={styles.listView}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          data={$.state.home}
          ListHeaderComponent={this.ListHeaderComponent}
          renderItem={renderItem}
          scrollToTop={isFocused}
          onHeaderRefresh={$.init}
          onFooterRefresh={$.fetchHome}
        />
        {isFocused && (
          <IconPortal index={0} onPress={$.onRefreshThenScrollTop} />
        )}
        <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
      </View>
    )
  }
}

const styles = _.create({
  listView: {
    flex: 1,
    marginBottom: IOS ? 0 : _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: (IOS ? _.bottom : _.bottom - _.tabBarHeight) + _.md
  }
})

function tabBarIcon({ tintColor }) {
  return <IconTabBar name='home' color={tintColor} />
}

function keyExtractor(item) {
  return item.type
}

function renderItem({ item }) {
  return (
    <View>
      <List {...item} />
      <Heatmap
        id='发现.跳转'
        data={{
          from: MODEL_SUBJECT_TYPE.getTitle(item.type)
        }}
      />
    </View>
  )
}
