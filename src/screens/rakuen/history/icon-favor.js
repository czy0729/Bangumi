/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-19 17:05:02
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function IconFavor({ $ }) {
  const { favor } = $.state
  return (
    <IconHeader
      name={favor ? 'star-full' : 'star'}
      color={favor ? _.colorYellow : _.colorDesc}
      onPress={$.toggleFavor}
    >
      <Heatmap id='本地帖子.切换收藏' />
    </IconHeader>
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)
