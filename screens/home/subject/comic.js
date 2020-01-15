/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-15 20:44:15
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

  const styles = memoStyles()
  return (
    <View style={[styles.container, style]}>
      <SectionTitle style={_.container.wind}>单行本</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.comic}
        width={80}
        height={106}
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    backgroundColor: _.colorPlain
  }
}))
