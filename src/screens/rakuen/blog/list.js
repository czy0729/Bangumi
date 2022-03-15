/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:18:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 21:32:24
 */
import React from 'react'
import { InteractionManager, StyleSheet, View } from 'react-native'
import { ListView, FixedTextarea } from '@components'
import { ItemPost } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import Top from './top'
import TouchScroll from './touch-scroll'

export default
@obc
class Blog extends React.Component {
  listView
  fixedTextarea
  scrollFailCount = 0

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const { $ } = this.context
      await $.init()

      if ($.postId) this.jump()
    })
  }

  connectListViewRef = ref => (this.listView = ref)

  connectFixedTextareaRef = ref => (this.fixedTextarea = ref)

  jump = () => {
    const { $ } = this.context
    if (!$.postId) return

    const { list, _loaded } = $.comments
    if (_loaded) {
      try {
        let scrollIndex = 0
        list.forEach((item, index) => {
          if (scrollIndex) return

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
      if (this.scrollFailCount > 10) return
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
      <ItemPost
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
    const { onScroll } = this.props
    const { placeholder, value } = $.state
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
          scrollToTop
          ListHeaderComponent={<Top />}
          renderItem={this.renderItem}
          onScroll={onScroll}
          onScrollToIndexFailed={this.onScrollToIndexFailed}
          onHeaderRefresh={$.fetchBlog}
          onFooterRefresh={$.fetchBlog}
          onEndReachedThreshold={0.5}
        />
        {$.isWebLogin && (
          <FixedTextarea
            ref={this.connectFixedTextareaRef}
            placeholder={placeholder ? `回复 ${placeholder}` : undefined}
            value={value}
            source
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
