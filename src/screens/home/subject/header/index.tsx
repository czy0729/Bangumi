/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 19:05:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, ErrorBoundary, renderWithErrorBoundary } from '@components'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Anitabi from '../anitabi'
import Bg from '../bg'
import Head from '../head'
import Lock from '../lock'
import Box from '../box'
import Ep from '../ep'
import SMB from '../smb'
import Tags from '../tags'
import Summary from '../summary'
import Thumbs from '../thumbs'
import Game from '../game'
import Info from '../info'
import Rating from '../rating'
import Character from '../character'
import Staff from '../staff'
import Relations from '../relations'
import Comic from '../comic'
import Catalog from '../catalog'
import Like from '../like'
import Recent from '../recent'
import Blog from '../blog'
import Topic from '../topic'
import TrackComment from '../track-comment'
import Comment from '../comment'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const TopEls = [
  Lock,
  Box,
  [Ep, ['onScrollIntoViewIfNeeded']],
  SMB,
  Tags,
  Summary,
  Thumbs,
  Info,
  Game,
  Rating,
  Character,
  Staff
] as const

const BottomEls = [
  Anitabi,
  Relations,
  Comic,
  Catalog,
  Like,
  Blog,
  Topic,
  Recent,
  Comment,
  TrackComment
] as const

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
      <Head />
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
