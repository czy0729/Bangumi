/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 15:45:51
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Image, Text, Flex } from '@components'
import { HOST } from '@constants'
import _ from '@styles'

function Award(props, { navigation }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Touchable
        style={styles.item}
        withoutFeedback
        onPress={() =>
          navigation.push('Award', {
            uri: `${HOST}/award/2018`
          })
        }
      >
        <View style={styles.image}>
          <Image
            style={styles.imageHero}
            src={require('@assets/images/hero.png')}
            size={148}
            placeholder={false}
          />
        </View>
        <Image
          style={styles.imageTitle}
          src={require('@assets/images/hero_title.png')}
          size={184}
          height={148}
          resizeMode='contain'
          placeholder={false}
        />
      </Touchable>
      {[2017].map((item, index) => (
        <Touchable
          key={item}
          style={_.ml.md}
          withoutFeedback
          onPress={() =>
            navigation.push('Award', {
              uri: `${HOST}/award/${item}`
            })
          }
        >
          <Flex
            style={[
              styles.itemSquare,
              {
                backgroundColor: index % 2 === 0 ? '#000' : _.colorDanger
              }
            ]}
            justify='center'
            direction='column'
          >
            {index === 0 && (
              <Text size={20} type='plain' bold>
                BEST OF
              </Text>
            )}
            <Text size={20} type='plain' bold>
              {item}
            </Text>
          </Flex>
        </Touchable>
      ))}
    </ScrollView>
  )
}

Award.contextTypes = {
  navigation: PropTypes.object
}

export default Award

const styles = StyleSheet.create({
  container: {
    padding: _.wind
  },
  item: {
    width: 312
  },
  itemSquare: {
    width: 148,
    height: 148,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: _.colorDanger,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  imageTitle: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: -8
  }
})
