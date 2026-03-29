/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:03:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 23:08:49
 */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Text } from '../../text'
import { extractText } from './utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function MaskText({ style, children }: Props) {
  const [show, setShow] = useState(false)

  const handlePress = useCallback(() => {
    setShow(prev => !prev)
  }, [])

  const styles = memoStyles()
  const flattenStyle = _.flatten(style)

  return (
    <Text>
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
        {show ? children : extractText(children)}
      </Text>
    </Text>
  )
}

export default observer(MaskText)
