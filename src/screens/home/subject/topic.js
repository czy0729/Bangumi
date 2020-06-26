/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 03:03:38
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _ } from '@stores'
import { URL_DEFAULT_AVATAR } from '@constants'

function Topic({ style }, { $, navigation }) {
  const { topic } = $.subject
  let _topic = topic || []
  if ($.filterDefault || $.isLimit) {
    _topic = _topic.filter(item => {
      if (
        !item.avatar ||
        (item.avatar && item.avatar.small.includes(URL_DEFAULT_AVATAR))
      ) {
        return false
      }
      return true
    })
  }
  if (_topic.length) {
    return null
  }
  return (
    <Expand style={style} ratio={2}>
      <SectionTitle style={{ paddingLeft: _.wind }}>讨论版</SectionTitle>
      <View style={_.mt.sm}>
        {_topic.map((item, index) => (
          <ItemArticle
            key={item.id}
            style={{
              paddingLeft: _.wind
            }}
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
                from: '讨论版',
                subjectId: $.subjectId
              }
            }}
          />
        ))}
      </View>
    </Expand>
  )
}

Topic.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Topic)
