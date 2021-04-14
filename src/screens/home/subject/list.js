/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:20:39
 */
import React from 'react'
import { ListView } from '@components'
import { ItemComment } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Header from './header'

const refreshControlProps = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
}

export default
@obc
class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { rendered } = this.props
    if (!rendered) {
      return null
    }

    const { $, navigation } = this.context
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
    const { $ } = this.context
    const { rendered, onScroll } = this.props
    return (
      <ListView
        style={_.container.flex}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={$.subjectComments}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        scrollToTop
        refreshControlProps={refreshControlProps}
        ListHeaderComponent={<Header rendered={rendered} />}
        renderItem={this.renderItem}
        onScroll={onScroll}
        onHeaderRefresh={rendered ? $.onHeaderRefresh : undefined}
        onFooterRefresh={rendered ? $.fetchSubjectComments : undefined}
      />
    )
  }
}

const styles = _.create({
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingBottom: _.space
  }
})
