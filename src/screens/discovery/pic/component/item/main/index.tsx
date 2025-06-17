/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 03:22:12
 */
import React from 'react'
import { Image } from 'react-native'
import { Touchable } from '@components'
import { Popover } from '@_'
import { useObserver } from '@utils/hooks'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Popover data={data} activateOn='hold' onSelect={onSelect}>
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
      </Popover>
    )
  })
}

export default Main
