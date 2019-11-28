/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-28 22:05:01
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconHeader } from '@screens/_'
import _ from '@styles'

function IconFavor({ $ }) {
  return (
    <IconHeader
      name={$.isFavor ? 'star-full' : 'star'}
      color={$.isFavor ? _.colorYellow : _.colorDesc}
      onPress={$.setFavor}
    />
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)
