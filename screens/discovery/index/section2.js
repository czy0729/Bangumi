/*
 * @Author: czy0729
 * @Date: 2019-07-28 18:16:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 11:03:58
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Touchable } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { getCoverMedium } from '@utils/app'
import { sectionWidth, sectionHeight } from './store'

function Section2(props, { $, navigation }) {
  const styles = memoStyles()
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
              src={getCoverMedium(randomCover)}
              size={sectionWidth}
              height={sectionHeight}
              radius={_.radiusSm}
              quality={false}
            />
          )}
          <Flex style={styles.desc} justify='center'>
            <Text size={20} type='plain' bold>
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
            size={64}
            placeholder={false}
            quality={false}
          />
        </Flex>
      </Touchable>
    </Flex>
  )
}

Section2.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Section2)

const memoStyles = _.memoStyles(_ => ({
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
    width: sectionWidth,
    height: sectionHeight,
    marginRight: _.wind,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
