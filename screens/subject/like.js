/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-23 00:33:59
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import _ from '@styles'

function Like({ style }, { $, navigation }) {
  const { like = [] } = $.subjectFormHTML
  if (!like.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>猜你喜欢</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={like}
        width={80}
        height={106}
        onPress={({ id, name, image }) =>
          navigation.push('Subject', {
            subjectId: id,
            _jp: name,
            _image: image
          })
        }
      />
    </View>
  )
}

Like.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Like)
