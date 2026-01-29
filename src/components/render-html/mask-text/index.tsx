/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 22:32:59
 */
import React, { useCallback, useState } from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { Props } from './types'

function MaskText({ style, children }: Props) {
  const [show, setShow] = useState(false)

  const handlePress = useCallback(() => {
    setShow(prev => !prev)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const flattenStyle = _.flatten(style)

    return (
      <Text
        style={stl(
          flattenStyle,
          show ? styles.blockTextShow : styles.blockText,
          flattenStyle?.fontSize &&
            !flattenStyle?.lineHeight && {
              lineHeight: Math.floor(flattenStyle.fontSize * 1.5)
            }
        )}
        onPress={handlePress}
      >
        {children}
      </Text>
    )
  })
}

export default MaskText
