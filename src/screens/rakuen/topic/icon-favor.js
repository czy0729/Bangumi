/*
 * @Author: czy0729
 * @Date: 2019-11-28 21:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 23:23:05
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'

function IconFavor({ $ }) {
  return (
    <IconHeader
      style={styles.icon}
      name={$.isFavor ? 'star-full' : 'star'}
      color={$.isFavor ? _.colorYellow : _.colorDesc}
      onPress={$.setFavor}
    >
      <Heatmap right={33} bottom={7} id='帖子.设置收藏' />
    </IconHeader>
  )
}

IconFavor.contextTypes = {
  $: PropTypes.object
}

export default observer(IconFavor)

const styles = StyleSheet.create({
  icon: {
    marginRight: -2
  }
})
