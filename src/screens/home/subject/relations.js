/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:19:31
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Relations({ style }, { $, navigation }) {
  if (!$.relations.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>关联</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.relations}
        width={80}
        height={106}
        findCn
        onPress={({ id, name, image }) => {
          t('条目.跳转', {
            to: 'Subject',
            from: '关联条目',
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

Relations.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Relations)
