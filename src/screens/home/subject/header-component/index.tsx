/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 17:10:53
 */
import React from 'react'
import { View } from 'react-native'
import { ErrorBoundary, Flex, Loading, renderWithErrorBoundary } from '@components'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import Bg from '../component/bg'
import Head from '../component/head'
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
        {!props.loaded && (
          <Flex style={styles.loading} justify='center'>
            <Loading />
          </Flex>
        )}
      </View>
    </>
  )
}

export default ob(HeaderComponent, COMPONENT)
