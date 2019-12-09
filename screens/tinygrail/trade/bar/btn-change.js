/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 21:56:52
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function BtnChange({ value, text }, { $ }) {
  const { distance } = $.state
  return (
    <Text
      style={{
        color: distance === value ? _.colorWarning : _.colorTinygrailText
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
