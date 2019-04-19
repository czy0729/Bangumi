/*
 * @Author: czy0729
 * @Date: 2019-04-10 00:34:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-12 22:42:39
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { SectionTitle, CommentItem } from '@screens/_'
import { wind } from '@styles'

const Comment = ({ style }, { $ }) => (
  <View style={style}>
    <SectionTitle style={{ paddingLeft: wind }}>吐槽</SectionTitle>
    <ListView
      keyExtractor={item => `${item.userid} ${item.time}`}
      data={$.subjectCommentsFormHTML}
      renderItem={({ item, index }) => (
        <CommentItem
          isTop={index === 0}
          time={item.time}
          avatar={item.avatar}
          username={item.username}
          star={item.star}
          comment={item.comment}
        />
      )}
      onFooterRefresh={$.fetchSubjectCommentsFormHTML}
    />
  </View>
)

Comment.contextTypes = {
  $: PropTypes.object
}

export default observer(Comment)
