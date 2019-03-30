/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 01:37:21
 */
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '@ant-design/react-native'
import { BlurView, Image, Text } from '@components'
import { ScoreTag } from '@screens/_'
import _, { wind, colorPlain, radiusLg } from '@styles'

const Head = ({ style }, { $ }) => {
  const { type } = $.state.bangumiInfo
  const {
    images = {},
    name = '',
    name_cn: nameCn = '',
    rating = {}
  } = $.subject
  return (
    <BlurView
      style={[styles.container, style]}
      theme='xdark'
      src={images.medium}
    >
      <StatusBar barStyle='light-content' />
      <View style={styles.image}>
        <Image
          src={images.large}
          size={120}
          height={160}
          radius
          border
          shadow
        />
      </View>
      <Flex
        style={styles.content}
        direction='column'
        justify='between'
        align='start'
      >
        <View>
          <Text type='sub' size={name.length > 16 ? 11 : 13}>
            {name} {!!type && `· ${String(type).toUpperCase()}`}
          </Text>
          <Text style={_.mt.xs} size={nameCn.length > 16 ? 16 : 20}>
            {nameCn}
          </Text>
        </View>
        <Flex align='baseline'>
          <Text type='main' size={24} lineHeight={1}>
            {rating.score}
          </Text>
          {rating.score !== undefined && (
            <ScoreTag style={_.ml.sm} value={rating.score} />
          )}
        </Flex>
      </Flex>
    </BlurView>
  )
}

Head.contextTypes = {
  $: PropTypes.object
}

export default observer(Head)

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: 226
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    top: 60,
    left: wind
  },
  content: {
    height: 140,
    paddingVertical: wind,
    paddingLeft: 120 + 1.8 * wind,
    paddingRight: wind,
    marginTop: 64,
    backgroundColor: colorPlain,
    borderTopLeftRadius: radiusLg,
    borderTopRightRadius: radiusLg
  }
})
