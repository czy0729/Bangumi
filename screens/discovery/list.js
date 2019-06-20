/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 21:30:37
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
// import { LinearGradient } from 'expo-linear-gradient'
import { LinearGradient } from 'expo'
import { Image, Text } from '@components'
import { SectionTitle, IconHeader } from '@screens/_'
import { findBangumiCn } from '@utils/app'
import { HOST, IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

const imageBigWidth = _.window.width - _.wind * 2
const imageBigHeight = imageBigWidth * 1.28
const imageWidth = _.window.width * 0.32
const imageHeight = imageWidth * 1.28

const List = ({ style, type }, { $, navigation }) => {
  if (!$.home[type].length) {
    return null
  }
  const data = $.home[type].sort(() => 0.5 - Math.random())
  const title = MODEL_SUBJECT_TYPE.getTitle(type)

  return (
    <>
      <SectionTitle
        style={styles.section}
        right={
          <IconHeader
            name='right'
            color={_.title}
            onPress={() =>
              navigation.push('WebView', {
                uri: `${HOST}/${type}`,
                title
              })
            }
          />
        }
      >
        {title}
      </SectionTitle>
      {[0].map(item => {
        const src =
          data[item].cover.replace(/\/c\/|\/g\//, '/l/') || IMG_DEFAULT
        return (
          <View key={item} style={styles.big}>
            <Image
              src={src}
              size={imageBigWidth}
              height={imageBigHeight}
              radius={_.radiusMd}
              onPress={() =>
                navigation.push('Subject', {
                  subjectId: data[item].subjectId,
                  _jp: data[item].title,
                  _image: src
                })
              }
            />
            <LinearGradient
              colors={[
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.8)'
              ]}
              pointerEvents='none'
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.desc} pointerEvents='none'>
              <Text style={styles.info} type='plain' bold>
                {data[item].info}
              </Text>
              <Text style={[styles.title, _.mt.xs]} size={26} type='plain' bold>
                {findBangumiCn(data[item].title)}
              </Text>
            </View>
          </View>
        )
      })}
      <ScrollView
        style={style}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
      >
        {data
          .filter((item, index) => index > 0)
          .map(item => {
            const src = item.cover.replace(/\/c\/|\/g\//, '/l/') || IMG_DEFAULT
            return (
              <View key={item.subjectId} style={styles.image}>
                <Image
                  src={src}
                  size={imageWidth}
                  height={imageHeight}
                  radius={_.radiusSm}
                  onPress={() =>
                    navigation.push('Subject', {
                      subjectId: item.subjectId,
                      _jp: item.title,
                      _image: src
                    })
                  }
                />
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0)',
                    'rgba(0, 0, 0, 0)',
                    'rgba(0, 0, 0, 0.8)'
                  ]}
                  pointerEvents='none'
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.desc} pointerEvents='none'>
                  <Text
                    style={styles.info}
                    size={12}
                    type='plain'
                    numberOfLines={1}
                  >
                    {item.info}
                  </Text>
                  <Text
                    style={[styles.title, _.mt.xs]}
                    size={14}
                    type='plain'
                    numberOfLines={1}
                    bold
                  >
                    {findBangumiCn(item.title)}
                  </Text>
                </View>
              </View>
            )
          })}
      </ScrollView>
    </>
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

List.defaultProps = {
  type: 'anime'
}

export default observer(List)

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: _.wind,
    paddingRight: 0
  },
  section: {
    marginTop: _.wind,
    marginHorizontal: _.wind
  },
  big: {
    marginTop: _.wind,
    marginHorizontal: _.wind,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  desc: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: _.wind,
    left: _.wind
  },
  info: {
    opacity: 0.8
  },
  title: {
    opacity: 0.88
  },
  image: {
    marginRight: _.wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
