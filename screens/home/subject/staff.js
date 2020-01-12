/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-12 22:47:54
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Staff({ style }, { $, navigation }) {
  const { staff = [] } = $.subject
  if (!staff.length) {
    return null
  }

  const styles = memoStyles()
  const data = staff.map(
    ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
      id,
      image: images.grid,
      _image: images.medium,
      name: nameCn || name,
      nameJP: name,
      desc: jobs[0]
    })
  )
  return (
    <View style={[styles.container, style]}>
      <SectionTitle style={_.container.wind}>制作人员</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={data}
        quality={false}
        onPress={({ id, name, nameJP, _image }) => {
          t('条目.跳转', {
            to: 'Mono',
            from: '制作人员',
            subjectId: $.subjectId
          })
          navigation.push('Mono', {
            monoId: `person/${id}`,
            _name: name,
            _jp: nameJP,
            _image
          })
        }}
      />
    </View>
  )
}

Staff.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Staff)

const memoStyles = _.memoStyles(_ => ({
  container: {
    backgroundColor: _.colorPlain
  }
}))
