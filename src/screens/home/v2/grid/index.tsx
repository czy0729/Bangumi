/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 11:23:18
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { systemStore, _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Info from './info'
import { keyExtractor, renderItem } from './utils'
import { memoStyles } from './styles'

class Grid extends React.Component<{
  title?: string
}> {
  static defaultProps = {
    title: '全部'
  }

  listView: {
    scrollToIndex: (arg0: {
      animated: boolean
      index: number
      viewOffset: number
    }) => void
  }

  componentDidMount() {
    // iOS端不知道原因, 初次渲染会看见下拉刷新的文字
    if (IOS && this.listView) {
      try {
        this.listView.scrollToIndex({
          animated: false,
          index: 0,
          viewOffset: 0
        })
      } catch (error) {
        console.error('HomeGrid', 'componentDidMount', error)
      }
    }
  }

  connectRef = ref => (this.listView = ref)

  renderList() {
    const { homeGridCoverLayout } = systemStore.setting
    const { $ } = this.context
    const { title } = this.props
    const collection = $.currentCollection(title)
    const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
    return (
      <PaginationList2
        key={`${_.orientation}${numColumns}`}
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={collection.list}
        limit={homeGridCoverLayout === 'square' ? 20 : 16}
        numColumns={numColumns}
        footerNoMoreDataComponent={<View />}
        footerNoMoreDataText=''
        renderItem={renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  }

  render() {
    global.rerender('Home.Grid')

    const { $ } = this.context
    if (!$.collection._loaded) return <Loading />

    const { title } = this.props
    return (
      <View style={this.styles.container}>
        <Info title={title} />
        <View>
          {_.isDark && (
            <LinearGradient
              style={this.styles.linear}
              colors={[
                `rgba(${_.colorPlainRaw.join()}, 1)`,
                `rgba(${_.colorPlainRaw.join()}, 0.8)`,
                `rgba(${_.colorPlainRaw.join()}, 0.32)`,
                `rgba(${_.colorPlainRaw.join()}, 0)`
              ]}
            />
          )}
          {this.renderList()}
        </View>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Grid)
