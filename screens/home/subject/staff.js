/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-18 12:14:18
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'

function Staff({ style }, { $, navigation }) {
  const { staff = [] } = $.subject
  if (!staff.length) {
    return null
  }

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
    <View style={style}>
      <SectionTitle style={_.container.wind}>制作人员</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={data}
        quality={false}
        onPress={({ id, name, nameJP, _image }) => {
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
