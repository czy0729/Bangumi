/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 23:49:22
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorText } from '../../styles'

function BtnChange({ value, text }, { $ }) {
  const { distance } = $.state
  return (
    <Text
      style={{
        color: distance === value ? _.colorWarning : colorText
      }}
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
