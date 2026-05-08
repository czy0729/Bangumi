/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 22:19:55
 */
import React, { useCallback, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { systemStore, tinygrailStore, useStore } from '@stores'
import { confirm, copy, info, open, showImageViewer } from '@utils'
import { TEXT_FETCHING_INTERCEPT } from '../../ds'
import { getURI } from '../../utils'
import Container from './container'
import Main from './main'
import { COMPONENT } from './ds'

import type { ReactNode } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

let hasTrial = false

function Item({ width, height, y, id, tags = '' }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const [error, setError] = useState(false)

  const image = $.image(id)

  const shouldSkip = error || (image && (image === 'null' || image.includes('404.jpg')))

  /** 侧拉菜单或长按菜单数据 */
  const memoData = useMemo(() => {
    return [
      '打开原图',
      '复制链接',
      '复制头像链接',
      $.params.monoId ? '设为塔图' : false,
      !$.params.monoId &&
        tinygrailStore.pic.name &&
        tinygrailStore.pic.monoId &&
        `设为〔${tinygrailStore.pic.name}〕的塔图`,
      ...tags.split(',').map(item => `# ${item}`)
    ].filter(Boolean) as string[]
  }, [$.params.monoId, tags])

  /** 查看大图 */
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

  /** 菜单选择 */
  const handleSelect = useCallback(
    async (title: string) => {
      if (title === '打开原图') {
        open(getURI(image, 'large'))
        return
      }

      if (title === '复制链接') {
        copy(getURI(image, 'mw690'), '已复制')
        return
      }

      if (title === '复制头像链接') {
        copy(getURI(image, 'square'), '已复制')
        return
      }

      if (title.startsWith('设为')) {
        if (!systemStore.advance) {
          if (hasTrial) {
            info('普通用户组已无剩余试用次数')
            return
          }

          confirm(
            '普通用户组暂不支持无限制使用此功能',
            async () => {
              const result = await tinygrailStore.doChangeCover(
                getURI(image, 'mw690'),
                $.params.monoId || tinygrailStore.pic.monoId
              )
              if (result) hasTrial = true
            },
            '小圣杯助手',
            () => {},
            '试用一次'
          )
          return
        }

        tinygrailStore.doChangeCover(
          getURI(image, 'mw690'),
          $.params.monoId || tinygrailStore.pic.monoId
        )
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
        })
      }
    },
    [$, image, navigation]
  )

  /** 图片加载失败 */
  const handleError = useCallback(() => {
    setError(true)
  }, [])

  // 404 占位或错误处理
  if (shouldSkip) return null

  let el: ReactNode = null
  if (image && tags) {
    el = (
      <Main
        width={width}
        height={height}
        data={memoData}
        image={image}
        onPress={handlePress}
        onSelect={handleSelect}
        onError={handleError}
      />
    )
  }

  return (
    <Container width={width} height={height} y={y}>
      {el}
    </Container>
  )
}

export default observer(Item)
