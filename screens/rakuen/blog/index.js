/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-26 11:14:16
 */
import React from 'react'
import { InteractionManager, Alert, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, FixedTextarea } from '@components'
import { _ } from '@stores'
import { copy, open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { TITLE, HOST } from '@constants'
import Top from './top'
import Item from './item'
import TouchScroll from './touch-scroll'
import Store from './store'

const title = '日志'
const ListHeaderComponent = <Top />

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content'
})
@observer
class Blog extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  listView
  fixedTextarea
  scrollFailCount = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
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
                    blogId: $.blogId
                  })
                }
              }
            ]
          )
        }, 800)
        return
      }

      const url = navigation.getParam('_url') || `${HOST}/blog/${$.blogId}`
      navigation.setParams({
        popover: {
          data: ['浏览器查看', '复制链接'],
          onSelect: key => {
            t('日志.右上角菜单', {
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
              default:
                break
            }
          }
        }
      })

      await $.init()

      if ($.postId) {
        this.jump()
      }

      hm(`blog/${$.blogId}`, 'Blog')
    })
  }

  connectListViewRef = ref => (this.listView = ref)

  connectFixedTextareaRef = ref => (this.fixedTextarea = ref)

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
        warn('blog/index.js', 'jump', error)
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
      warn('blog/index.js', 'scrollTo', error)
    }
  }

  scrollToThenFeedback = (index = 0) => {
    const { $ } = this.context
    t('日志.楼层跳转', {
      blogId: $.blogId,
      index
    })

    if (index === -1) {
      info('#0', 0.8)
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
      warn('blog/index.js', 'scrollToThenFeedback', error)
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
    const event = {
      id: '日志.跳转',
      data: {
        blogId: $.blogId
      }
    }
    return (
      <Item
        index={index}
        postId={$.postId}
        authorId={$.blog.userId}
        {...item}
        showFixedTextare={this.showFixedTextare}
        event={event}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { placeholder, value } = $.state
    const { onScroll } = this.props
    return (
      <View style={_.container.content}>
        <ListView
          ref={this.connectListViewRef}
          style={_.container.content}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          data={$.comments}
          scrollEventThrottle={16}
          initialNumToRender={50}
          removeClippedSubviews={false}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={this.renderItem}
          onScroll={onScroll}
          onScrollToIndexFailed={this.onScrollToIndexFailed}
          onHeaderRefresh={$.fetchBlog}
          onFooterRefresh={$.fetchBlog}
          onEndReachedThreshold={0.5}
          {...withTransitionHeader.listViewProps}
        />
        {$.isWebLogin && (
          <FixedTextarea
            ref={this.connectFixedTextareaRef}
            placeholder={placeholder ? `回复 ${placeholder}` : undefined}
            value={value}
            onChange={$.onChange}
            onClose={$.closeFixedTextarea}
            onSubmit={$.doSubmit}
          />
        )}
        <TouchScroll onPress={this.scrollToThenFeedback} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: _.bottom
  }
})
