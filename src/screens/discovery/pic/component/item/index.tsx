/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 03:06:51
 */
import React, { useCallback, useMemo } from 'react'
import { Image } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { InView, Popover } from '@_'
import { useStore } from '@stores'
import { showImageViewer } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { getURI } from '../../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ width, height, y, id, tags = '' }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const image = $.image(id)

    const memoData = useMemo(
      () => ['打开原图', '设为塔图', ...tags.split(',').map(item => `# ${item}`)],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [tags]
    )
    const elImage = useMemo(() => {
      if (!image || image === 'null' || !tags) return null

      return (
        <Touchable
          style={styles.image}
          withoutFeedback
          onPress={() => {
            showImageViewer(
              [
                {
                  url: getURI(image, 'orj480')
                }
              ],
              0,
              false,
              true
            )
          }}
        >
          <Image
            width={width}
            height={height}
            fadeDuration={280}
            source={{
              uri: getURI(image)
            }}
          />
        </Touchable>
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image, width, height, tags])
    const handleSelect = useCallback(() => {}, [])

    return (
      <Flex
        style={[
          styles.item,
          {
            width,
            height
          }
        ]}
        justify='center'
      >
        <InView y={y}>
          {!image || !tags ? null : image === 'null' ? (
            <Text type='icon' size={12} bold>
              加载失败
            </Text>
          ) : (
            <Popover data={memoData} activateOn='hold' onSelect={handleSelect}>
              {elImage}
            </Popover>
          )}
        </InView>
      </Flex>
    )
  })
}

export default Item
