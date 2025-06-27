/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 21:56:15
 */
import React, { useCallback, useMemo } from 'react'
import { Text } from '@components'
import { systemStore, tinygrailStore, useStore } from '@stores'
import { confirm, info, open, showImageViewer } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ReactNode } from '@types'
import { TEXT_FETCHING_INTERCEPT } from '../../ds'
import { Ctx } from '../../types'
import { getURI } from '../../utils'
import Container from './container'
import Main from './main'
import { COMPONENT } from './ds'

let hasTrial = false

function Item({ width, height, y, id, tags = '' }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const image = $.image(id)

    const memoData = useMemo(() => {
      return [
        '打开原图',
        $.params.monoId ? '设为塔图' : false,
        ...tags.split(',').map(item => `# ${item}`)
      ].filter(Boolean) as string[]
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])

    const handlePress = useCallback(() => {
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
    }, [image])
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
                const result = await tinygrailStore.doChangeCover(
                  getURI(image, 'mw1024'),
                  $.params.monoId
                )
                if (result) hasTrial = true
              },
              '小圣杯助手',
              () => {},
              '试用一次'
            )
            return
          }

          tinygrailStore.doChangeCover(getURI(image, 'mw1024'), $.params.monoId)
          return
        }

        if ($.checkGlobalFetching()) {
          info(TEXT_FETCHING_INTERCEPT)
          return
        }

        const name = title.split('# ')?.[1]
        if (name) {
          navigation[$.params.replace ? 'replace' : 'push']('Pic', {
            monoId: $.params.monoId,
            name
            // replace: true
          })
        }
      },
      [image]
    )

    let el: ReactNode = null
    if (image && image !== 'null' && tags) {
      el = (
        <Main
          width={width}
          height={height}
          data={memoData}
          image={image}
          onPress={handlePress}
          onSelect={handleSelect}
        />
      )
    } else if (image === 'null') {
      el = (
        <Text type='icon' size={12} bold>
          加载失败
        </Text>
      )
    }

    return (
      <Container width={width} height={height} y={y}>
        {el}
      </Container>
    )
  })
}

export default Item
