/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-01 22:37:52
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Flex, Text, Mesume } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import GridInfo from './grid-info'
import GridItem from './grid-item'

const correctHeightIOS = 14 // @issue iOS端头部高度误差修正值
const listViewProps = IOS
  ? {
      contentOffset: {
        y: -(_.tabsHeaderHeight - correctHeightIOS)
      }
    }
  : {}

class List extends React.Component {
  static defaultProps = {
    title: '全部'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  listView

  componentDidMount() {
    // @notice iOS端不知道原因, 初次渲染会看见下拉刷新的文字
    if (IOS && this.listView) {
      try {
        this.listView.scrollToIndex({
          animated: false,
          index: 0,
          viewOffset: 0
        })
      } catch (error) {
        // do nothing
      }
    }
  }

  render() {
    const { $ } = this.context
    const { title } = this.props
    if (!$.userCollection._loaded) {
      return <Loading />
    }

    // 筛选当前类型
    const userCollection = {
      ...$.userCollection
    }
    const type = MODEL_SUBJECT_TYPE.getValue(title)
    if (type) {
      userCollection.list = userCollection.list.filter(
        item => item.subject.type == type
      )
    }
    userCollection.list = $.sortList(userCollection.list)

    // 当前条目数据
    const { current } = $.state
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
            <Flex style={styles.noSelect} justify='center' direction='column'>
              <Mesume size={80} />
              <Text style={_.mt.sm} type='sub' align='center'>
                请点击下方条目
              </Text>
            </Flex>
          )}
        </View>
        <ListView
          ref={ref => (this.listView = ref)}
          contentContainerStyle={styles.grid}
          numColumns={4}
          keyExtractor={item => String(item.subject_id)}
          data={userCollection}
          renderItem={({ item }) => <GridItem {...item} />}
          footerNoMoreDataText=''
          footerNoMoreDataComponent={<View />}
          onHeaderRefresh={() => $.initFetch(true)}
          {...listViewProps}
        />
      </View>
    )
  }
}

export default observer(List)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: IOS ? _.tabsHeaderHeight - correctHeightIOS : 0
  },
  current: {
    width: '100%',
    height: 284,
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
