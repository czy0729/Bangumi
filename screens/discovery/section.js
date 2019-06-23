/*
 * @Author: czy0729
 * @Date: 2019-06-23 21:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 22:02:39
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo'
import PropTypes from 'prop-types'
import { Flex, Text, Image } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

const width = (_.window.width - _.wind * 3) / 2
const height = width * 1.28

const Section = (props, { $, navigation }) => {
  let randomCover = ''
  if ($.random._loaded) {
    randomCover = $.random.list.length && $.random.list[0].cover
  }

  let calendarCover = ''
  if ($.calendar._loaded) {
    // 今天星期几的数据排最前
    let day = new Date().getDay()
    if (day === 0) {
      day = 7
    }
    calendarCover = $.calendar.list.slice(day - 1)[0].items[0].images.large
  }

  return (
    <Flex style={styles.section}>
      <View style={styles.image}>
        {!!randomCover && (
          <Image
            src={randomCover}
            size={width}
            height={height}
            radius={_.radiusSm}
            onPress={() => navigation.push('Random')}
          />
        )}
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
          <Text style={styles.title} size={26} type='plain' bold>
            随便看看
          </Text>
        </View>
      </View>
      <View style={styles.image}>
        {!!calendarCover && (
          <Image
            src={calendarCover}
            size={width}
            height={height}
            radius={_.radiusSm}
            onPress={() => navigation.push('Calendar')}
          />
        )}
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
          <Text style={styles.title} size={26} type='plain' bold>
            每日放送
          </Text>
        </View>
      </View>
    </Flex>
  )
}

Section.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Section)

const styles = StyleSheet.create({
  section: {
    marginTop: _.wind,
    marginHorizontal: _.wind
  },
  desc: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: _.wind,
    left: _.wind
  },
  title: {
    opacity: 0.88
  },
  image: {
    width,
    height,
    marginRight: _.wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
