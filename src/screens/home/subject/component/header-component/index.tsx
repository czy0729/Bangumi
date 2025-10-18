/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 18:26:13
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Component, ErrorBoundary } from '@components'
import { renderWithErrorBoundary } from '@components/error-boundary/utils'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, COMPONENT, TopEls } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function HeaderComponent(props: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elTop = useMemo(
    () => TopEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const elBottom = useMemo(
    () => BottomEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return useObserver(() => (
    <Component key={_.orientation} id='screen-subject-header-component'>
      {!IOS && (
        <ErrorBoundary>
          <Bg />
        </ErrorBoundary>
      )}
      <Head onBlockRef={props.onBlockRef} />
      <View style={_.container.plain}>
        {elTop}
        {$.state.scrolled && elBottom}
        <Loading />
      </View>
    </Component>
  ))
}

export default HeaderComponent
