/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-15 20:40:28
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

  const styles = memoStyles()
  return (
    <View style={[styles.container, style]}>
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    backgroundColor: _.colorPlain
  }
}))
