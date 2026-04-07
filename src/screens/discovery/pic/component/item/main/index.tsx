/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-11 05:43:32
 */
import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { Popover } from '@_'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  const styles = memoStyles()

  const elImage = useMemo(
    () => (
      <Touchable style={styles.image} withoutFeedback onPress={onPress}>
        <Image
          width={width}
          height={height}
          fadeDuration={280}
          source={{
            uri: getURI(image)
          }}
        />
      </Touchable>
    ),
    [height, image, onPress, styles, width]
  )

  return (
    <Popover data={data} activateOn='hold' onSelect={onSelect}>
      {elImage}
    </Popover>
  )
}

export default observer(Main)
