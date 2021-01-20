/*
 * @Author: czy0729
 * @Date: 2019-10-19 20:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:25:11
 */
import React from 'react'
import { View } from 'react-native'
import { Loading, ListView, Flex, Text, Mesume } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import GridInfo from './grid-info'
import GridItem from './grid-item'

const listViewProps = IOS
  ? {
      contentOffset: {
        y: -_.tabsHeaderHeight
      }
    }
  : {}
const footerNoMoreDataComponent = <View />
const prevTextMap = {
  全部: '条目',
  动画: '番组',
  书籍: '书籍',
  三次元: '电视剧',
  游戏: '游戏'
}

export default
@obc
class Grid extends React.Component {
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
        warn('HomeGrid', 'componentDidMount', error)
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
          请先点击下方{prevTextMap[title]}
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

    const { current, grid } = $.state
    const userCollection = $.currentUserCollection(title)
    const isGame = title === '游戏'
    const find = isGame
      ? grid
      : userCollection.list.find(item => item.subject_id === current)
    return (
      <View style={this.styles.container}>
        <View style={isGame ? this.styles.game : this.styles.current}>
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
          style={!IOS && this.styles.androidWrap}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          data={userCollection}
          numColumns={_.isPad ? 5 : 4}
          footerNoMoreDataComponent={footerNoMoreDataComponent}
          footerNoMoreDataText=''
          renderItem={renderItem}
          onHeaderRefresh={$.onHeaderRefresh}
          {...listViewProps}
        />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    paddingTop: IOS ? _.tabsHeaderHeight : 0,
    paddingBottom: IOS ? _.tabBarHeight : 0,
    backgroundColor: _.select(_.colorPlain, _.colorBg)
  },
  game: {
    width: '100%',
    height: 160
  },
  current: {
    width: '100%',
    height: 212
  },
  noSelect: {
    width: '100%',
    height: '100%'
  },
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingBottom: IOS
      ? _.tabBarHeight + _.space
      : _.tabBarHeight + _.space - _.tabBarHeight,
    paddingLeft: _.wind - _.sm - 2
  }
}))

function keyExtractor(item) {
  return String(item.subject_id || item.id)
}

function renderItem({ item }) {
  return (
    <GridItem
      subjectId={item.subject_id || item.id}
      subject={
        item.subject || {
          id: item.id,
          images: {
            common: item.cover,
            grid: item.cover,
            large: item.cover,
            medium: item.cover,
            small: item.cover
          },
          name: item.name,
          name_cn: item.nameCn,
          summary: '',
          type: MODEL_SUBJECT_TYPE.getValue('游戏'),
          url: ''
        }
      }
      epStatus={item.ep_status}
    />
  )
}
