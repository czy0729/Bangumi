/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 04:42:03
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Component, ErrorBoundary } from '@components'
import { renderWithErrorBoundary } from '@components/error-boundary/utils'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { Ctx } from '../../types'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, TopEls } from './ds'

function HeaderComponent(props) {
  const { $ } = useStore<Ctx>()
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
