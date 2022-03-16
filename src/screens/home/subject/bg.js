/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 19:40:50
 */
import React from 'react'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { IOS } from '@constants'

const defaultProps = {
  styles: {},
  src: ''
}

const Bg = memo(({ styles, src }) => {
  rerender('Subject.Bg.Main')

  return (
    <BlurView
      style={styles.blurView}
      theme={_.select(null, 'dark')}
      tint={_.select('default', 'dark')}
      src={src}
    />
  )
}, defaultProps)

export default obc(({ show }, { $ }) => {
  rerender('Subject.Bg')

  if (!show) return null

  const { images = {} } = $.subject
  const src = $.coverPlaceholder || images.common
  if (typeof src !== 'string') return null

  return <Bg styles={memoStyles()} show={show} src={src} />
})

const memoStyles = _.memoStyles(() => ({
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
