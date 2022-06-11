/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-11 15:17:35
 */
import React from 'react'
import { ListView } from '@components'
import { ItemComment } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { Fn } from '@types'
import Header from './header'

const refreshControlProps = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
}

class List extends React.Component<{
  onScroll: Fn
}> {
  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { rendered } = $.state
    if (!rendered) return null

    return (
      <ItemComment
        navigation={navigation}
        event={{
          id: '条目.跳转',
          data: {
            from: '吐槽',
            subjectId: $.subjectId
          }
        }}
        index={index}
        time={item.time}
        avatar={item.avatar}
        userId={item.userId}
        userName={item.userName}
        star={$.hideScore ? undefined : item.star}
        comment={item.comment}
      />
    )
  }

  render() {
    global.rerender('Subject.List')

    const { $ } = this.context
    const { onScroll } = this.props
    return (
      <ListView
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.subjectComments}
        lazy={1}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        scrollToTop
        footerEmptyDataComponent={$.footerEmptyDataComponent}
        refreshControlProps={refreshControlProps}
        ListHeaderComponent={<Header />}
        renderItem={this.renderItem}
        onScroll={onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchSubjectComments}
      />
    )
  }
}

export default obc(List)
