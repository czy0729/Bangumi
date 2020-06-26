/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 03:03:40
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _ } from '@stores'
import { URL_DEFAULT_AVATAR } from '@constants'

function Blog({ style }, { $, navigation }) {
  const { blog } = $.subject
  let _blog = blog || []
  if ($.filterDefault || $.isLimit) {
    _blog = _blog.filter(item => {
      if (
        !item.avatar ||
        (item.avatar && item.avatar.small.includes(URL_DEFAULT_AVATAR))
      ) {
        return false
      }
      return true
    })
  }
  if (!_blog.length) {
    return null
  }
  const styles = memoStyles()
  return (
    <Expand style={style} ratio={2}>
      <SectionTitle style={styles.left}>评论</SectionTitle>
      <View style={_.mt.sm}>
        {_blog.map((item, index) => (
          <ItemArticle
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            style={styles.left}
            navigation={navigation}
            index={index}
            avatar={item.user.avatar.small}
            title={item.title}
            summary={item.summary}
            nickname={item.user.nickname}
            timestamp={item.timestamp}
            replies={item.replies}
            url={item.url}
            event={{
              id: '条目.跳转',
              data: {
                from: '评论',
                subjectId: $.subjectId
              }
            }}
          />
        ))}
      </View>
    </Expand>
  )
}

Blog.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Blog)

const memoStyles = _.memoStyles(_ => ({
  left: {
    paddingLeft: _.wind
  }
}))
