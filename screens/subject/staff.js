/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-02 14:11:14
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Characters } from '@screens/_'
import _ from '@styles'

const Staff = ({ style }, { $ }) => {
  const { staff } = $.subject
  if (!staff) {
    return null
  }
  return (
    <View style={[_.container.wind, style]}>
      <Text size={20}>制作人员</Text>
      <Characters
        style={_.mt.md}
        data={staff.map(
          ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
            id,
            image: images && images.grid,
            name: nameCn || name,
            desc: jobs[0]
          })
        )}
      />
    </View>
  )
}

Staff.contextTypes = {
  $: PropTypes.object
}

export default observer(Staff)
