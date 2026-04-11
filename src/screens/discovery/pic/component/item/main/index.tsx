/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 09:37:02
 */
import React, { useEffect, useMemo, useState } from 'react'
import { Image } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [image])

  const styles = memoStyles()

  const elImage = useMemo(
    () => (
      <Touchable style={styles.image} withoutFeedback onPress={onPress}>
        {isError ? (
          <Flex style={{ width, height }} justify='center'>
            <Text type={_.select('sub', 'icon')} size={16} bold>
              404
            </Text>
          </Flex>
        ) : (
          <Image
            style={{ width, height }}
            fadeDuration={280}
            source={{ uri: getURI(image) }}
            onError={() => setIsError(true)}
          />
        )}
      </Touchable>
    ),
    [height, image, onPress, styles, width, isError]
  )

  return (
    <Popover data={data} activateOn='hold' onSelect={onSelect}>
      {elImage}
    </Popover>
  )
}

export default observer(Main)
