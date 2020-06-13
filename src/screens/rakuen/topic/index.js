/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-13 15:19:09
 */
import React from 'react'
import { InteractionManager, Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, FixedTextarea, Flex, Text } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { copy, open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { keyExtractor, appNavigate } from '@utils/app'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { TITLE, HOST, IOS } from '@constants'
import HeaderTitle from './header-title'
import Top from './top'
import Item from './item'
import TouchScroll from './touch-scroll'
import IconFavor from './icon-favor'
import Store from './store'

const title = '帖子'
const ListHeaderComponent = <Top />

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content',
  HeaderTitle
})
@observer
class Topic extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    rendered: false
  }

  listView
  fixedTextarea
  scrollFailCount = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      setTimeout(() => {
        this.rendered()
      }, 300)

      const { $, navigation } = this.context
      if (!$.isUGCAgree) {
        /**
         * @issue 这里注意在iOS上面, 一定要延迟,
         * 不然首页点击讨论跳进来popover + alert直接就不能操作了
         */
        setTimeout(() => {
          t('帖子.UCG')

          Alert.alert(
            '社区指导原则',
            `${TITLE} 是一个纯粹的ACG网络, 请查看社区指导原则并且同意后才能继续操作`,
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
          data: ['浏览器查看', '复制链接', '举报'],
          onSelect: key => {
            t('帖子.右上角菜单', {
              key
            })

            switch (key) {
              case '浏览器查看':
                open(url)
                break
              case '复制链接':
                copy(url)
                info('已复制')
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
    })
  }

  connectListViewRef = ref => (this.listView = ref)

  connectFixedTextareaRef = ref => (this.fixedTextarea = ref)

  onScroll = e => {
    const { $ } = this.context
    const { onScroll } = this.props
    onScroll(e)
    this.rendered()

    const { showHeaderTitle } = $.state
    const { nativeEvent } = e
    const { y } = nativeEvent.contentOffset
    const headerTranstion = 48
    if (!showHeaderTitle && y > headerTranstion) {
      $.updateShowHeaderTitle(true)
      return
    }

    if (showHeaderTitle && y <= headerTranstion) {
      $.updateShowHeaderTitle(false)
    }
  }

  /**
   * 用于延迟底部块渲染
   * 优化条目页面进入渲染时, 同时渲染过多块导致掉帧的问题
   */
  rendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        rendered: true
      })
    }
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
        warn('topic/index.js', 'jump', error)
      }
    }
  }

  scrollTo = (index = 0) => {
    const { $ } = this.context
    const { list } = $.comments
    info(list[index].floor, 0.8)
    try {
      this.listView.scrollToIndex({
        animated: false,
        index,
        viewOffset: 0
      })
    } catch (error) {
      warn('topic/index.js', 'scrollTo', error)
    }
  }

  scrollToThenFeedback = (index = 0) => {
    const { $ } = this.context
    t('帖子.楼层跳转', {
      topicId: $.topicId,
      index
    })

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
    try {
      this.listView.scrollToIndex({
        animated: true,
        index,
        viewOffset: 0 + _.headerHeight
      })
    } catch (error) {
      warn('topic/index.js', 'scrollToThenFeedback', error)
    }
  }

  onScrollToIndexFailed = ({ highestMeasuredFrameIndex, index }) => {
    this.scrollTo(highestMeasuredFrameIndex)
    setTimeout(() => {
      if (this.scrollFailCount > 10) {
        return
      }
      this.scrollFailCount += 1
      this.scrollTo(index)
    }, 100)
  }

  showFixedTextare = () => this.fixedTextarea.onFocus()

  renderItem = ({ item, index }) => {
    const { $ } = this.context
    const { rendered } = this.state
    if (!rendered && index > 4 && !$.postId) {
      return null
    }

    const event = {
      id: '帖子.跳转',
      data: {
        topicId: $.topicId
      }
    }
    return (
      <Item
        index={index}
        postId={$.postId}
        authorId={$.topic.userId}
        {...item}
        showFixedTextare={this.showFixedTextare}
        event={event}
      />
    )
  }

  renderFixedBottom() {
    const { $, navigation } = this.context
    const { placeholder, value } = $.state
    const { tip, close } = $.topic
    if (tip.includes('半公开')) {
      return (
        <Flex style={this.styles.fixedBottom}>
          <Text>半公开小组只有成员才能发言, </Text>
          <Text
            type='main'
            onPress={() => appNavigate($.groupHref, navigation)}
          >
            点击加入
          </Text>
        </Flex>
      )
    }

    if (close) {
      return (
        <Flex style={this.styles.fixedBottom}>
          <Text>主题已被关闭: </Text>
          <Text type='sub'>{close}</Text>
        </Flex>
      )
    }

    if (!$.isWebLogin) {
      return null
    }

    return (
      <FixedTextarea
        ref={this.connectFixedTextareaRef}
        placeholder={placeholder ? `回复 ${placeholder}` : undefined}
        value={value}
        onChange={$.onChange}
        onClose={$.closeFixedTextarea}
        onSubmit={$.doSubmit}
      />
    )
  }

  render() {
    const { $ } = this.context
    return (
      <View style={_.container.flex}>
        <NavigationBarEvents />
        <ListView
          ref={this.connectListViewRef}
          style={_.container.content}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          data={$.comments}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          initialNumToRender={96}
          maxToRenderPerBatch={96}
          updateCellsBatchingPeriod={96}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={this.renderItem}
          onScroll={this.onScroll}
          onScrollToIndexFailed={this.onScrollToIndexFailed}
          onHeaderRefresh={$.fetchTopic}
          onFooterRefresh={$.fetchTopic}
          onEndReachedThreshold={0.5}
          {...withTransitionHeader.listViewProps}
        />
        {this.renderFixedBottom()}
        <TouchScroll onPress={this.scrollToThenFeedback} />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingBottom: _.bottom
  },
  fixedBottom: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    height: 46,
    paddingHorizontal: _.wind,
    marginBottom: -4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    ...(IOS
      ? {
          shadowColor: _.colorShadow,
          shadowOffset: {
            height: -2
          },
          shadowOpacity: 0.06,
          shadowRadius: 6
        }
      : {
          elevation: 8
        })
  }
}))
