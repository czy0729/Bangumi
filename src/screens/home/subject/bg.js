/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 13:35:43
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { getCoverMedium } from '@utils/app'
import { IOS } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

function Bg({ show }, { $ }) {
  if (!show) {
    return null
  }

  const styles = memoStyles()
  const { images = {} } = $.subject
  return (
    <BlurView
      style={styles.blurView}
      theme={_.select(null, 'dark')}
      tint={_.select('default', 'dark')}
      src={CDN_OSS_SUBJECT(getCoverMedium($.coverPlaceholder || images.common))}
    />
  )
}

Bg.contextTypes = {
  $: PropTypes.object
}

export default observer(Bg)

const memoStyles = _.memoStyles(_ => ({
  blurView: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    height: IOS ? _.window.height * 0.32 : 160, // iOS有弹簧, 所以拉下来太矮会看见背景
    backgroundColor: _.colorBg
  }
}))
