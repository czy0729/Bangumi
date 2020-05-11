/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:19:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Comic({ style }, { $, navigation }) {
  if (!$.comic.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.comic}
        width={80}
        height={106}
        ellipsizeMode='middle'
        onPress={({ id, name, image }) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '单行本',
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

Comic.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Comic)
