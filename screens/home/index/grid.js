/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 20:18:51
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Flex, Text, Mesume } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import GridInfo from './grid-info'
import GridItem from './grid-item'

const correctHeightIOS = 14 // iOS端头部高度误差修正值
const listViewProps = IOS
  ? {
      contentOffset: {
        y: -(_.tabsHeaderHeight - correctHeightIOS)
      }
    }
  : {}
const footerNoMoreDataComponent = <View />

class Grid extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  static contextTypes = {
    $: PropTypes.object
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
        warn('HomeGrid', 'componentDidMount', error)
      }
    }
  }

  connectRef = ref => (this.listView = ref)

  renderEmpty() {
    return (
      <Flex style={styles.noSelect} justify='center' direction='column'>
        <Mesume size={80} />
        <Text style={_.mt.sm} type='sub' align='center'>
          请点击下方条目
        </Text>
      </Flex>
    )
  }

  render() {
    const { $ } = this.context
    const { title } = this.props
    if (!$.userCollection._loaded) {
      return <Loading />
    }

    const { current } = $.state
    const userCollection = $.currentUserCollection(title)
    const find = userCollection.list.find(item => item.subject_id === current)
    return (
      <View style={styles.container}>
        <View style={styles.current}>
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
        <ListView
          ref={this.connectRef}
          contentContainerStyle={styles.grid}
          keyExtractor={keyExtractor}
          data={userCollection}
          numColumns={5}
          footerNoMoreDataComponent={footerNoMoreDataComponent}
          footerNoMoreDataText=''
          renderItem={renderItem}
          onHeaderRefresh={$.onHeaderRefresh}
          {...listViewProps}
        />
      </View>
    )
  }
}

export default observer(Grid)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: IOS ? _.tabsHeaderHeight - correctHeightIOS : 0
  },
  current: {
    width: '100%',
    height: 268,
    paddingHorizontal: _.sm
  },
  noSelect: {
    width: '100%',
    height: '100%'
  },
  grid: {
    paddingBottom: _.tabBarHeight + _.sm
  }
})

function keyExtractor(item) {
  return String(item.subject_id)
}
function renderItem({ item }) {
  return <GridItem {...item} />
}
