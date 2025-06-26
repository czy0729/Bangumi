/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:51:45
 */
import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { Touchable } from '@components'
import { Popover } from '@_'
import { useObserver } from '@utils/hooks'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  return useObserver(() => {
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
      [styles.image]
    )

    return (
      <Popover data={data} activateOn='hold' onSelect={onSelect}>
        {elImage}
      </Popover>
    )
  })
}

export default Main
