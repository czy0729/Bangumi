/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:30:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-09 15:10:35
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { ScoreTag } from '@screens/_'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _, { wind, colorPlain, radiusLg } from '@styles'

const imageWidth = 120

const Head = ({ style }, { $ }) => {
  const {
    images = {},
    name = '',
    name_cn: nameCn = '',
    rating = {
      count: {},
      score: '',
      total: ''
    },
    type
  } = $.subject

  // bangumiInfo只有动画的数据
  let label = MODEL_SUBJECT_TYPE.getTitle(type)
  if (label === '动画') {
    label = String($.state.bangumiInfo.type).toUpperCase()
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.image}>
        <Image
          src={images.large}
          size={imageWidth}
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
          {!!nameCn && (
            <Text type='sub' size={name.length > 16 ? 11 : 13}>
              {name} · {label}
            </Text>
          )}
          <Text style={!!nameCn && _.mt.xs} size={nameCn.length > 16 ? 16 : 20}>
            {nameCn || name}
          </Text>
        </View>
        <Flex align='baseline'>
          <Text type='main' size={24} lineHeight={1}>
            {rating.score === '' ? '-' : rating.score.toFixed(1)}
          </Text>
          {rating.score !== '' && (
            <ScoreTag style={_.ml.sm} value={rating.score} />
          )}
        </Flex>
      </Flex>
    </View>
  )
}

Head.contextTypes = {
  $: PropTypes.object
}

export default observer(Head)

const styles = StyleSheet.create({
  container: {
    paddingTop: 48
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    top: wind,
    left: wind
  },
  content: {
    height: 144,
    paddingVertical: wind,
    paddingLeft: imageWidth + wind + 12,
    paddingRight: wind,
    backgroundColor: colorPlain,
    borderTopLeftRadius: radiusLg,
    borderTopRightRadius: radiusLg
  }
})
