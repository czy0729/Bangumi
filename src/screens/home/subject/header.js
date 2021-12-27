/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-27 07:49:32
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Head from './head'
import Lock from './lock'
import Box from './box'
import Ep from './ep'
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
    <View style={styles.container}>
      <Head />
      <View style={styles.content}>
        <Lock />
        <Box />
        <Ep />
        <Tags />
        <Summary />
        {rendered && (
          <>
            <Game />
            <Thumbs />
            <Info />
            <Rating />
            <Character />
            <Staff />
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
    </View>
  )
}

export default obc(Header)

const memoStyles = _.memoStyles(() => ({
  container: {
    // position: 'relative',
    // zIndex: 0,
    paddingBottom: _.sm
  },
  content: {
    minHeight: _.window.height * 0.5,
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
