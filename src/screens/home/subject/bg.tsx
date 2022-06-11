/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:31:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-11 11:27:02
 */
import React from 'react'
import { View } from 'react-native'
import { BlurView } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'

const defaultProps = {
  style: {},
  src: ''
}

const Bg = memo(({ style, src }) => {
  global.rerender('Subject.Bg.Main')

  return (
    <BlurView
      style={style}
      // theme={_.select(null, 'dark')}
      tint={_.select('default', 'dark')}
      src={src}
    />
  )
}, defaultProps)

export default obc((props, { $ }) => {
  global.rerender('Subject.Bg')

  const styles = memoStyles()
  const { images = {} } = $.subject
  const src = $.coverPlaceholder || images.common
  if (typeof src !== 'string') return <View style={styles.bg} />

  return <Bg style={styles.bg} src={src} />
})

const memoStyles = _.memoStyles(() => ({
  bg: _.ios(
    {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: 160,
      backgroundColor: _.colorBg
    },
    {
      height: 160,
      backgroundColor: _.colorBg
    }
  )
}))
