/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:45:58
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Flex, Loading, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Head from './head'
import Lock from './lock'
import Box from './box'
import Ep from './ep'
import Tags from './tags'
import Summary from './summary'
import Thumbs from './thumbs'
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
import RateSegement from './rate-segment'
import IconComment from './icon/comment'

function Header({ rendered }, { $ }) {
  const styles = memoStyles()
  const {
    pagination: { pageTotal = 0 },
    _loaded
  } = $.subjectComments
  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.content}>
        <Lock />
        <Box style={_.mt.md} />
        <Ep style={_.mt.lg} />
        <Tags style={_.mt.lg} />
        {rendered && (
          <>
            <Summary style={_.mt.lg} />
            <Thumbs style={_.mt.lg} />
            <Info style={_.mt.lg} />
            <Rating style={_.mt.lg} />
            <Character style={_.mt.lg} />
            <Staff style={_.mt.lg} />
            <Relations style={_.mt.lg} />
            <Comic style={_.mt.lg} />
            <Catalog style={_.mt.lg} />
            <Like style={_.mt.lg} />
            <Recent style={_.mt.lg} />
            <Blog style={_.mt.lg} />
            <Topic style={_.mt.lg} />
            <SectionTitle
              style={styles.title}
              right={
                <>
                  <RateSegement />
                  <IconComment />
                </>
              }
            >
              吐槽{' '}
              <Text size={12} type='sub' lineHeight={24}>
                {20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)}+
              </Text>
            </SectionTitle>
            <Heatmap
              bottom={32}
              id='条目.跳转'
              data={{
                from: '吐槽'
              }}
            />
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    position: 'relative',
    zIndex: 0,
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
