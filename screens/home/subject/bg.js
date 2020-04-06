/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-04-06 05:31:17
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { getCoverMedium } from '@utils/app'
import { IOS } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

function Bg({ show, image }, { $ }) {
  if (!show) {
    return null
  }

  return (
    <BlurView
      style={styles.blurView}
      theme='dark'
      tint={_.select('default', 'dark')}
      src={CDN_OSS_SUBJECT(getCoverMedium($.coverPlaceholder || image))}
    />
  )
}

Bg.contextTypes = {
  $: PropTypes.object
}

export default observer(Bg)

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    height: IOS ? _.window.height * 0.32 : 160 // iOS有弹簧, 所以拉下来太矮会看见背景
  }
})
