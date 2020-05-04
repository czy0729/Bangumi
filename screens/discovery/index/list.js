/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 21:31:53
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Touchable, Flex, Image, Text, Iconfont } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _ } from '@stores'
import { findBangumiCn, getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'
import { IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const imageWidthLg = _.window.width - _.wind * 2
const imageHeightLg = imageWidthLg * 1.28
const imageWidth = _.window.width * 0.34
const imageHeight = imageWidth * 1.28
const linearColorLg = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.8)'
]
const linearColorSm = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.8)'
]
const dataCache = {}

function List({ style, type }, { $, navigation }) {
  if (!$.home[type].length) {
    return null
  }

  const styles = memoStyles()
  const data =
    dataCache[type] || $.home[type].sort(() => 0.5 - Math.random()) || []
  if (!dataCache[type] && data.length) {
    dataCache[type] = data
  }

  const title = MODEL_SUBJECT_TYPE.getTitle(type)
  const src = getCoverLarge(data[0].cover) || IMG_DEFAULT
  const cn = findBangumiCn(data[0].title)
  return (
    <>
      <SectionTitle
        style={styles.section}
        right={
          <Touchable
            onPress={() => {
              t('发现.跳转', {
                to: 'Channel',
                title
              })

              navigation.push('Channel', {
                type
              })
            }}
          >
            <Flex>
              <Text>频道</Text>
              <Iconfont style={_.ml.xs} name='right' color={_.colorTitle} />
            </Flex>
          </Touchable>
        }
      >
        {title}
      </SectionTitle>
      <View style={styles.big}>
        <Image
          src={src}
          size={imageWidthLg}
          height={imageHeightLg}
          radius={_.radiusMd}
          placeholder={false}
          onPress={() => {
            t('发现.跳转', {
              to: 'Subject',
              from: title,
              type: 'lg',
              subjectId: data[0].subjectId
            })

            navigation.push('Subject', {
              subjectId: data[0].subjectId,
              _jp: data[0].title,
              _cn: cn,
              _image: src
            })
          }}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={linearColorLg}
          pointerEvents='none'
        />
        <View style={styles.desc} pointerEvents='none'>
          <Text style={styles.info} type={_.select('plain', 'desc')} bold>
            {data[0].info}
          </Text>
          <Text
            style={[styles.title, _.mt.xs]}
            size={26}
            type={_.select('plain', 'title')}
            bold
          >
            {cn}
          </Text>
        </View>
      </View>
      <ScrollView
        style={style}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data
          .filter((item, index) => index > 0)
          .map(item => {
            const src = item.cover || IMG_DEFAULT
            const cn = findBangumiCn(item.title)
            return (
              <View key={item.subjectId} style={styles.image}>
                <Cover
                  src={src}
                  size={imageWidth}
                  height={imageHeight}
                  radius={_.radiusSm}
                  placeholder={false}
                  onPress={() => {
                    t('发现.跳转', {
                      to: 'Subject',
                      from: title,
                      type: 'sm',
                      subjectId: item.subjectId
                    })

                    navigation.push('Subject', {
                      subjectId: item.subjectId,
                      _jp: item.title,
                      _cn: cn,
                      _image: src
                    })
                  }}
                />
                <LinearGradient
                  style={StyleSheet.absoluteFill}
                  colors={linearColorSm}
                  pointerEvents='none'
                />
                <View style={styles.desc} pointerEvents='none'>
                  <Text
                    style={styles.info}
                    size={12}
                    type={_.select('plain', 'title')}
                    numberOfLines={1}
                  >
                    {item.info}
                  </Text>
                  <Text
                    style={[styles.title, _.mt.xs]}
                    type={_.select('plain', 'title')}
                    numberOfLines={1}
                    bold
                  >
                    {cn}
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

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingVertical: _.space,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  section: {
    marginTop: _.space,
    marginHorizontal: _.wind
  },
  big: {
    marginTop: _.space,
    marginHorizontal: _.wind,
    backgroundColor: _.colorIcon,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  desc: {
    position: 'absolute',
    zIndex: 1,
    right: _._wind - 2,
    bottom: _.space - 2,
    left: _._wind - 2
  },
  info: {
    opacity: 0.92
  },
  title: {
    opacity: 0.92
  },
  image: {
    marginRight: _._wind,
    backgroundColor: _.colorIcon,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
