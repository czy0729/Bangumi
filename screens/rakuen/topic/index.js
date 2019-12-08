/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 04:23:53
 */
import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, FixedTextarea } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'
import Top from './top'
import Item from './item'
import TouchScroll from './touch-scroll'
import IconFavor from './icon-favor'
import Store from './store'

const title = '帖子'

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content'
})
@observer
class Topic extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  listView
  fixedTextarea
  scrollFailCount = 0

  async componentDidMount() {
    const { $, navigation } = this.context
    if (!$.isUGCAgree) {
      // @notice 这里注意在iOS上面, 一定要延迟,
      // 不然首页点击讨论跳进来popover + alert直接就不能操作了
      setTimeout(() => {
        Alert.alert(
          '社区指导原则',
          '生命有限, Bangumi 是一个纯粹的ACG网络, 请查看社区指导原则并且同意才能继续操作',
          [
            {
              text: '取消',
              style: 'cancel',
              onPress: () => navigation.goBack()
            },
            {
              text: '查看',
              onPress: () => {
                navigation.goBack()
                navigation.push('UGCAgree', {
                  topicId: $.topicId
                })
              }
            }
          ]
        )
      }, 800)
      return
    }

    const url =
      navigation.getParam('_url') || `${HOST}/rakuen/topic/${$.topicId}`
    navigation.setParams({
      extra: <IconFavor $={$} />,
      popover: {
        data: ['浏览器查看', '举报'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(url)
              break
            case '举报':
              open(`${HOST}/group/forum`)
              break
            default:
              break
          }
        }
      }
    })

    await $.init()
    const { title } = $.topic
    withTransitionHeader.setTitle(navigation, title)

    if ($.postId) {
      this.jump()
    }

    hm(`rakuen/topic/${$.topicId}`, 'Topic')
  }

  jump = () => {
    const { $ } = this.context
    if (!$.postId) {
      return
    }

    const { list, _loaded } = $.comments
    if (_loaded) {
      try {
        let scrollIndex = 0
        list.forEach((item, index) => {
          if (scrollIndex) {
            return
          }

          if (item.id === $.postId) {
            scrollIndex = index
          } else if (item.sub) {
            item.sub.forEach(i => {
              if (i.id === $.postId) {
                scrollIndex = index
              }
            })
          }
        })

        if (scrollIndex) {
          this.scrollTo(scrollIndex)
        }
      } catch (error) {
        // do nothing
      }
    }
  }

  scrollTo = (index = 0) => {
    const { $ } = this.context
    const { list } = $.comments
    info(list[index].floor, 0.8)
    this.listView.scrollToIndex({
      animated: false,
      index,
      viewOffset: 0
    })
  }

  scrollToThenFeedback = (index = 0) => {
    const { $ } = this.context
    if (index === -1) {
      info('#1', 0.8)
      this.listView.scrollToOffset({
        animated: true,
        offset: 0 - _.headerHeight
      })
      return
    }

    const { list } = $.comments
    info(list[index].floor, 0.8)
    this.listView.scrollToIndex({
      animated: true,
      index,
      viewOffset: 0 + _.headerHeight
    })
  }

  showFixedTextare = () => {
    this.fixedTextarea.onFocus()
  }

  render() {
    const { $ } = this.context
    const { placeholder, value } = $.state
    const { onScroll } = this.props
    return (
      <>
        <ListView
          ref={ref => (this.listView = ref)}
          style={this.styles.container}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyExtractor={item => String(item.id)}
          data={$.comments}
          scrollEventThrottle={32}
          initialNumToRender={$.postId ? 50 : undefined} // 为了可以更快地到达目标楼层
          ListHeaderComponent={<Top />}
          renderItem={({ item, index }) => (
            <Item
              index={index}
              postId={$.postId}
              authorId={$.topic.userId}
              {...item}
              showFixedTextare={this.showFixedTextare}
            />
          )}
          onScroll={onScroll}
          onScrollToIndexFailed={({ highestMeasuredFrameIndex, index }) => {
            this.scrollTo(highestMeasuredFrameIndex)
            setTimeout(() => {
              if (this.scrollFailCount > 10) {
                return
              }
              this.scrollFailCount += 1
              this.scrollTo(index)
            }, 100)
          }}
          onHeaderRefresh={$.fetchTopic}
          onFooterRefresh={$.fetchTopic}
          onEndReachedThreshold={0.5}
          {...withTransitionHeader.listViewProps}
        />
        {$.isWebLogin && (
          <FixedTextarea
            ref={ref => (this.fixedTextarea = ref)}
            placeholder={placeholder ? `回复 ${placeholder}` : undefined}
            value={value}
            onChange={$.onChange}
            onClose={$.closeFixedTextarea}
            onSubmit={$.doSubmit}
          />
        )}
        <TouchScroll onPress={index => this.scrollToThenFeedback(index)} />
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  contentContainerStyle: {
    paddingBottom: _.bottom
  }
}))
