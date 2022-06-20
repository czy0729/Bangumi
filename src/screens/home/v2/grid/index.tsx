/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 21:37:16
 */
import React from 'react'
import { View } from 'react-native'
import { Loading, ListView, Flex, Text, Mesume } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import GridInfo from '../grid-info'
import { keyExtractor, renderItem } from './utils'
import { PREV_TEXT } from './ds'
import { memoStyles } from './styles'

class Grid extends React.Component<{
  title?: string
}> {
  static defaultProps = {
    title: '全部'
  }

  listView

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

  renderEmpty() {
    const { title } = this.props
    return (
      <Flex style={this.styles.noSelect} justify='center' direction='column'>
        <Mesume size={80} />
        <Text style={_.mt.sm} type='sub' align='center'>
          请先点击下方{PREV_TEXT[title]}
        </Text>
      </Flex>
    )
  }

  renderInfo() {
    const { $ } = this.context
    const { title } = this.props
    if (!$.userCollection._loaded) return <Loading />

    const { current, grid } = $.state
    const userCollection = $.currentUserCollection(title)
    const isGame = title === '游戏'
    const find = isGame
      ? grid
      : userCollection.list.find(item => item.subject_id === current)
    return (
      <View style={isGame ? this.styles.gameInfo : this.styles.info}>
        {find ? (
          <GridInfo
            subjectId={find.subject_id}
            subject={find.subject}
            epStatus={find.ep_status}
          />
        ) : (
          this.renderEmpty()
        )}
      </View>
    )
  }

  renderList() {
    const { $ } = this.context
    const { title } = this.props
    const userCollection = $.currentUserCollection(title)
    const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
    return (
      <ListView
        key={`${_.orientation}${numColumns}`}
        ref={this.connectRef}
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={userCollection}
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
    if (!$.userCollection._loaded) return <Loading />

    return (
      <View style={this.styles.container}>
        {this.renderInfo()}
        {this.renderList()}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Grid)
