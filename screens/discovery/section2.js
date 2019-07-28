/*
 * @Author: czy0729
 * @Date: 2019-07-28 18:16:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 18:38:05
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Touchable } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

const width = (_.window.width - _.wind * 3) / 2
const height = width

const Section = (props, { $, navigation }) => {
  let randomCover = ''
  if ($.random._loaded) {
    randomCover = $.random.list.length && $.random.list[0].cover
  }
  return (
    <Flex style={styles.section}>
      <Touchable onPress={() => navigation.push('Random')}>
        <View style={styles.image}>
          {!!randomCover && (
            <Image
              src={randomCover}
              size={width}
              height={height}
              radius={_.radiusSm}
            />
          )}
          <Flex style={styles.desc} justify='center'>
            <Text size={26} type='plain' bold>
              随便看看
            </Text>
          </Flex>
        </View>
      </Touchable>

      <Touchable onPress={() => navigation.push('Anitama')}>
        <Flex
          justify='center'
          style={[
            styles.image,
            {
              backgroundColor: '#000'
            }
          ]}
        >
          <Image
            src={require('@assets/images/anitama.jpg')}
            size={80}
            placeholder={false}
          />
        </Flex>
      </Touchable>
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
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    backgroundColor: _.colorMask
  },
  image: {
    width,
    height,
    marginRight: _.wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
