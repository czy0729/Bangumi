/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 15:56:47
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import _ from '@styles'

const Relations = ({ style }, { $, navigation }) => {
  const { relations = [] } = $.subjectFormHTML
  if (!relations.length) {
    return null
  }

  const data = relations.map(({ id, image, title, type }) => ({
    id,
    image,
    name: title,
    desc: type
  }))
  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>关联条目</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={data}
        width={80}
        height={106}
        onSelect={id => {
          navigation.push('Subject', {
            subjectId: id
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
