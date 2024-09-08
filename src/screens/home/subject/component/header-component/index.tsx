/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 20:22:31
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Component, ErrorBoundary } from '@components'
import { renderWithErrorBoundary } from '@components/error-boundary/utils'
import { _ } from '@stores'
import { c } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { Ctx } from '../../types'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, TopEls } from './ds'

function HeaderComponent(props, { $ }: Ctx) {
  const elTop = useMemo(
    () => TopEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    []
  )
  const elBottom = useMemo(
    () => BottomEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    []
  )

  return useObserver(() => (
    <Component id='screen-subject-header-component'>
      {!IOS && (
        <ErrorBoundary>
          <Bg />
        </ErrorBoundary>
      )}
      <Head onBlockRef={props.onBlockRef} />
      <View style={_.container.plain}>
        {elTop}
        {$.state.rendered && elBottom}
        <Loading />
      </View>
    </Component>
  ))
}

export default c(HeaderComponent)
