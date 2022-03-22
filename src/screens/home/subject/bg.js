/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-22 22:17:25
 */
import React from 'react'
import { View } from 'react-native'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'

const defaultProps = {
  styles: {},
  src: ''
}

const Bg = memo(({ styles, src }) => {
  rerender('Subject.Bg.Main')

  return (
    <BlurView
      style={styles.bg}
      theme={_.select(null, 'dark')}
      tint={_.select('default', 'dark')}
      src={src}
    />
  )
}, defaultProps)

export default obc((props, { $ }) => {
  rerender('Subject.Bg')

  const styles = memoStyles()
  const { images = {} } = $.subject
  const src = $.coverPlaceholder || images.common
  if (typeof src !== 'string') return <View style={styles.bg} />

  return <Bg styles={styles} src={src} />
})

const memoStyles = _.memoStyles(() => ({
  bg: {
    height: 160,
    backgroundColor: _.colorBg
  }
}))
