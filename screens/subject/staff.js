/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-08 01:53:41
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { HorizontalList } from '@screens/_'
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
      <Text style={_.container.wind} size={18}>
        制作人员
      </Text>
      <HorizontalList style={_.mt.md} data={data} />
    </View>
  )
}

Staff.contextTypes = {
  $: PropTypes.object
}

export default observer(Staff)
