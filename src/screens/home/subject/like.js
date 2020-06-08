/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:00:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:20:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Like({ style }, { $, navigation }) {
  if (!$.like.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>猜你喜欢</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.like}
        width={80}
        height={106}
        onPress={({ id, name, image }) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '猜你喜欢',
            subjectId: $.subjectId
          })
          navigation.push('Subject', {
            subjectId: id,
            _jp: name,
            _image: image
          })
        }}
      />
    </View>
  )
}

Like.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Like)
