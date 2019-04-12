/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-12 12:41:05
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SectionTitle } from '@screens/_'
import _, { wind, colorPlain } from '@styles'
import Head from './head'
import Box from './box'
import Ep from './ep'
import Tags from './tags'
import Summary from './summary'
import Rating from './rating'
import Character from './character'
import Staff from './staff'
import Relations from './relations'
import Blog from './blog'
import Topic from './topic'

const Header = () => (
  <>
    <Head />
    <View style={styles.content}>
      <Box style={_.mt.md} />
      <Ep style={_.mt.lg} />
      <Tags style={_.mt.lg} />
      <Summary style={_.mt.lg} />
      <Rating style={_.mt.lg} />
      <Character style={_.mt.lg} />
      <Staff style={_.mt.lg} />
      <Relations style={_.mt.lg} />
      <Blog style={_.mt.lg} />
      <Topic style={_.mt.lg} />
      <SectionTitle style={[styles.title, _.mt.lg]}>吐槽</SectionTitle>
    </View>
  </>
)

export default Header

const styles = StyleSheet.create({
  content: {
    backgroundColor: colorPlain
  },
  title: {
    paddingLeft: wind
  }
})
