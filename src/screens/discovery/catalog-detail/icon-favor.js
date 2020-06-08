/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-06 17:12:38
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function IconFavor({ $ }) {
  return (
    <IconHeader
      name={$.isCollect ? 'star-full' : 'star'}
      color={$.isCollect ? _.colorYellow : _.colorDesc}
      onPress={$.toggleCollect}
    />
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)
