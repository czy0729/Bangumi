/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 15:56:40
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import _ from '@styles'

const Staff = ({ style }, { $ }) => {
  const { staff = [] } = $.subject
  if (!staff.length) {
    return null
  }

  const data = staff.map(
    ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
      id,
      image: images.grid,
      name: nameCn || name,
      desc: jobs[0]
    })
  )
  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>制作人员</SectionTitle>
      <HorizontalList style={_.mt.sm} data={data} />
    </View>
  )
}

Staff.contextTypes = {
  $: PropTypes.object
}

export default observer(Staff)
