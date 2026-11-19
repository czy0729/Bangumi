/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 00:00:00
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Component, ErrorBoundary, Flex } from '@components'
import { renderWithErrorBoundary } from '@components/error-boundary/utils'
import { _, useStore } from '@stores'
import { IOS } from '@constants'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, COMPONENT, TopEls } from './ds'
import { useDeferredBlocks } from './hooks'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderComponent(props: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  // 转场完成后逐帧放行, 已放行数量为 0 表示转场尚未完成
  const deferredCount = useDeferredBlocks($, BottomEls.length)
  const started = deferredCount > 0

  // 按原顺序渲染 TopEls, 延迟区块在转场完成后才渲染
  const elTop = useMemo(
    () =>
      TopEls.map(({ el, defer }, index) => {
        if (defer && !started) {
          return null
        }
        return renderWithErrorBoundary(el, index, props)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [started]
  )

  // 已放行的区块保持实例, 后续只追加新区块
  const elBottom = useMemo(
    () =>
      BottomEls.slice(0, deferredCount).map((item, index) => renderWithErrorBoundary(item, index, props)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deferredCount]
  )

  return (
    <Component key={_.orientation} id='screen-subject-header-component'>
      {!IOS && (
        <ErrorBoundary>
          <Bg />
        </ErrorBoundary>
      )}
      <Head onBlockRef={props.onBlockRef} />
      <Flex.Item style={IOS && _.container.plain}>
        {elTop}
        {elBottom}
        <Loading />
      </Flex.Item>
    </Component>
  )
}

export default observer(HeaderComponent)
