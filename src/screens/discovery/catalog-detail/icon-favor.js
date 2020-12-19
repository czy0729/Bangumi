/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 21:34:43
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function IconFavor({ $ }) {
  return (
    <IconHeader
      name={$.isCollect ? 'star-full' : 'star'}
      color={$.isCollect ? _.colorYellow : _.colorDesc}
      onPress={$.toggleCollect}
    >
      <Heatmap right={75} id='目录详情.取消收藏' />
      <Heatmap right={30} id='目录详情.收藏' />
    </IconHeader>
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)
