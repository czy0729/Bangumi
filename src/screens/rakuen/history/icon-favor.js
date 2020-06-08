/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 13:55:23
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function IconFavor({ $ }) {
  const { favor } = $.state
  return (
    <IconHeader
      name={favor ? 'star-full' : 'star'}
      color={favor ? _.colorYellow : _.colorDesc}
      onPress={$.toggleFavor}
    />
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)
