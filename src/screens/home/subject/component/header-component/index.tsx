/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:47:33
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { ErrorBoundary } from '@components'
import { renderWithErrorBoundary } from '@components/error-boundary/utils'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, TopEls } from './ds'
import { memoStyles } from './styles'

function HeaderComponent(props) {
  const elTop = useMemo(
    () => TopEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    []
  )
  const elBottom = useMemo(
    () => BottomEls.map((item, index) => renderWithErrorBoundary(item, index, props)),
    []
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        {!IOS && (
          <ErrorBoundary>
            <Bg />
          </ErrorBoundary>
        )}
        <Head onBlockRef={props.onBlockRef} />
        <View style={styles.content}>
          {elTop}
          {elBottom}
          <Loading />
        </View>
      </>
    )
  })
}

export default HeaderComponent
