/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 19:53:16
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { RNImage, Touchable } from '@components'
import { Popover } from '@_'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function Main({ width, height, data, image, onPress, onSelect, onError }: Props) {
  const styles = memoStyles()

  const handleError = useCallback(() => {
    onError?.()
  }, [onError])

  const elImage = useMemo(
    () => (
      <Touchable style={styles.image} withoutFeedback onPress={onPress}>
        <RNImage
          style={{ width, height }}
          fadeDuration={280}
          source={{ uri: getURI(image) }}
          onError={handleError}
        />
      </Touchable>
    ),
    [styles, onPress, width, height, image, handleError]
  )

  return (
    <Popover data={data} activateOn='hold' onSelect={onSelect}>
      {elImage}
    </Popover>
  )
}

export default observer(Main)
