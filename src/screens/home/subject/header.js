/*
 * @Author: czy0729
 * @Date: 2019-04-12 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 20:41:19
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text, Flex, Loading, SegmentedControl, Heatmap } from '@components'
import { SectionTitle, IconReverse } from '@screens/_'
import { _ } from '@stores'
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

const scoresDS = ['全部', '9-10', '7-8', '4-6', '1-3']

function Header({ rendered }, { $ }) {
  const styles = memoStyles()
  const {
    pagination: { pageTotal = 0 },
    _reverse,
    _loaded
  } = $.subjectComments
  const { filterScores } = $.state
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
              style={[styles.title, _.mt.lg]}
              right={
                <>
                  <View>
                    <SegmentedControl
                      style={styles.segmentedControl}
                      size={11}
                      values={scoresDS}
                      selectedIndex={
                        filterScores.length
                          ? scoresDS.findIndex(
                              item => item === filterScores.join('-')
                            )
                          : 0
                      }
                      onValueChange={$.filterScores}
                    />
                    <Heatmap right={30} bottom={-4} id='条目.筛选分数' />
                  </View>
                  <IconReverse
                    style={styles.sort}
                    color={_reverse ? _.colorMain : _.colorIcon}
                    onPress={$.toggleReverseComments}
                  >
                    <Heatmap id='条目.吐槽箱倒序' />
                  </IconReverse>
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

Header.contextTypes = {
  $: PropTypes.object
}

export default observer(Header)

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
    paddingHorizontal: _.wind
  },
  sort: {
    marginRight: -_.sm
  },
  loading: {
    height: 240
  },
  segmentedControl: {
    height: 22
  }
}))
