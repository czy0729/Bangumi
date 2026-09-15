/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:44
 */
import { useCallback, useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { Popover } from '@_'
import { getURI } from '../../../utils'
import { styles } from './styles'

import type { Props } from './types'

function Main({ width, height, data, image, onPress, onSelect, onError }: Props) {
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
    [onPress, width, height, image, handleError]
  )

  return (
    <Popover data={data} activateOn='hold' onSelect={onSelect}>
      {elImage}
    </Popover>
  )
}

export default observer(Main)
