/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 15:00:57
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, ErrorBoundary, renderWithErrorBoundary } from '@components'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Bg from '../bg'
import Head from '../head'
import { Ctx } from '../types'
import { TopEls, BottomEls } from './ds'
import { memoStyles } from './styles'

function Header(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { _loaded } = $.subjectComments
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
        {$.rendered &&
          BottomEls.map((item, index) => renderWithErrorBoundary(item, index, props))}
        {!_loaded && (
          <Flex style={styles.loading} justify='center'>
            <Loading />
          </Flex>
        )}
      </View>
    </>
  )
}

export default obc(Header)
