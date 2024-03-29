/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 17:49:57
 */
import React from 'react'
import { View } from 'react-native'
import { ErrorBoundary, renderWithErrorBoundary } from '@components'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import Bg from '../bg'
import Head from '../head'
import Loading from '../loading'
import { BottomEls, COMPONENT, TopEls } from './ds'
import { memoStyles } from './styles'

function HeaderComponent(props) {
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
        {TopEls.map((item, index) => renderWithErrorBoundary(item, index, props))}
        {BottomEls.map((item, index) => renderWithErrorBoundary(item, index, props))}
        <Loading />
      </View>
    </>
  )
}

export default ob(HeaderComponent, COMPONENT)
