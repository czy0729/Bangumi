/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 01:45:17
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Bg from './bg'
import Head from './head'
import Lock from './lock'
import Box from './box'
import Ep from './ep'
import SMB from './smb'
import Tags from './tags'
import Summary from './summary'
import Thumbs from './thumbs'
import Game from './game'
import Info from './info'
import Rating from './rating'
import Character from './character'
import Staff from './staff'
import Relations from './relations'
import Comic from './comic'
import Catalog from './catalog'
import Like from './like'
import Recent from './recent'
import Blog from './blog'
import Topic from './topic'
import Comment from './comment'

function Header(props, { $ }) {
  const styles = memoStyles()
  const { rendered } = $.state
  const { _loaded } = $.subjectComments
  return (
    <>
      {!IOS && <Bg />}
      <Head />
      <View style={styles.content}>
        <Lock />
        <Box />
        <Ep />
        <SMB />
        <Tags />
        <Summary />
        <Thumbs />
        <Game />
        <Info />
        <Rating />
        <Character />
        <Staff />
        {rendered && (
          <>
            <Relations />
            <Comic />
            <Catalog />
            <Like />
            <Blog />
            <Topic />
            <Recent />
            <Comment />
          </>
        )}
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

const memoStyles = _.memoStyles(() => ({
  content: {
    zIndex: 1,
    backgroundColor: _.colorPlain
  },
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  loading: {
    height: 240
  }
}))
