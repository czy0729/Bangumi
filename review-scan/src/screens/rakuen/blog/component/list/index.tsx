/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:18:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 12:28:04
 */
import React from 'react'
import { View } from 'react-native'
import { FixedTextarea, ListView } from '@components'
import { ItemPost } from '@_'
import { _ } from '@stores'
import { info, keyExtractor, runAfter } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { Fn, Override } from '@types'
import { Ctx } from '../../types'
import Top from '../top'
import TouchScroll from '../touch-scroll'
import { COMPONENT } from './ds'

class Blog extends React.Component<
  Override<
    Ctx,
    {
      onScroll: Fn
    }
  >
> {
  listView: any

  fixedTextarea: any

  scrollFailCount = 0

  componentDidMount() {
    runAfter(async () => {
      const { $ } = this.props
      await $.init()

      if ($.postId) this.jump()
    })
  }

  connectListViewRef = ref => (this.listView = ref)

  connectFixedTextareaRef = ref => (this.fixedTextarea = ref)

  jump = () => {
    const { $ } = this.props
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
        console.error('blog/index.js', 'jump', error)
      }
    }
  }

  scrollTo = (index = 0) => {
    const { $ } = this.props
    const { list } = $.comments
    info(list[index].floor, 0.8)

    try {
      this.listView.scrollToIndex({
        animated: false,
        index,
        viewOffset: 0
      })
    } catch (error) {
      console.error('blog/index.js', 'scrollTo', error)
    }
  }

  scrollToThenFeedback = (index = 0) => {
    const { $ } = this.props
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
      console.error('blog/index.js', 'scrollToThenFeedback', error)
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
    const { $ } = this.props
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
    r(COMPONENT)

    const { $, onScroll } = this.props
    const { placeholder, value } = $.state
    return (
      <View style={_.container.content}>
        <ListView
          ref={this.connectListViewRef}
          style={_.container.content}
          contentContainerStyle={_.container.bottom}
          keyExtractor={keyExtractor}
          data={$.comments}
          ListHeaderComponent={<Top />}
          renderItem={this.renderItem}
          onScroll={onScroll}
          onScrollToIndexFailed={this.onScrollToIndexFailed}
          onHeaderRefresh={$.fetchBlog}
          onFooterRefresh={$.fetchBlog}
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

export default ob(Blog)
