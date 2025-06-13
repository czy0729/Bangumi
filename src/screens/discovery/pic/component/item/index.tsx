/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-14 01:24:40
 */
import React, { useCallback, useMemo } from 'react'
import { Image } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { InView, Popover } from '@_'
import { systemStore, tinygrailStore, useStore } from '@stores'
import { confirm, info, open, showImageViewer } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { getURI } from '../../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

let hasTrial = false

function Item({ width, height, y, id, tags = '' }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const image = $.image(id)
    const { monoId } = $.params

    const memoData = useMemo(
      () => {
        return [
          '打开原图',
          monoId ? '设为塔图' : false,
          ...tags.split(',').map(item => `# ${item}`)
        ].filter(Boolean) as string[]
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [monoId, tags]
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
                  url: getURI(image, 'mw690')
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
    const handleSelect = useCallback(
      async (title: string) => {
        if (title === '打开原图') {
          open(getURI(image, 'large'))
          return
        }

        if (title === '设为塔图') {
          if (!systemStore.advance) {
            if (hasTrial) {
              info('普通用户组已无剩余试用次数')
              return
            }

            confirm(
              '普通用户组暂不支持无限制使用此功能',
              async () => {
                const result = await tinygrailStore.doChangeCover(getURI(image, 'mw1024'), monoId)
                if (result) hasTrial = true
              },
              '小圣杯助手',
              () => {},
              '试用一次'
            )
            return
          }

          tinygrailStore.doChangeCover(getURI(image, 'mw1024'), monoId)
          return
        }

        const name = title.split('# ')?.[1]
        if (name) {
          navigation[$.params.replace ? 'replace' : 'push']('Pic', {
            name,
            replace: true
          })
        }
      },
      [image, monoId]
    )

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
