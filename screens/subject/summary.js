/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 17:20:47
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import _ from '@styles'

const Summary = ({ style }, { $ }) => {
  const { name, summary } = $.subject
  return (
    <View style={[_.container.wind, style]}>
      <Text size={18}>简介</Text>
      <Text style={_.mt.sm} size={15} lineHeight={22}>
        {name ? summary || '-' : summary}
      </Text>
    </View>
  )
}

Summary.contextTypes = {
  $: PropTypes.object
}

export default observer(Summary)
