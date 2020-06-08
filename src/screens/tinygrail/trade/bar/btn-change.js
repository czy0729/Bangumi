/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 23:11:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { observer } from '@utils/decorators'

function BtnChange({ value, text }, { $ }) {
  const { distance } = $.state
  return (
    <Text
      type={distance === value ? 'warning' : 'tinygrailText'}
      size={13}
      onPress={() => $.changeDistance(value)}
    >
      {text}
    </Text>
  )
}

BtnChange.contextTypes = {
  $: PropTypes.object
}

export default observer(BtnChange)
