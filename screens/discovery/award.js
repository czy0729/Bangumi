/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 11:43:28
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Image } from '@components'
import { HOST } from '@constants'
import _ from '@styles'

function Award(props, { navigation }) {
  return (
    <Touchable
      style={styles.container}
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
          size={160}
          placeholder={false}
        />
      </View>
      <Image
        style={styles.imageTitle}
        src={require('@assets/images/hero_title.png')}
        size={224}
        height={160}
        resizeMode='contain'
        placeholder={false}
      />
    </Touchable>
  )
}

Award.contextTypes = {
  navigation: PropTypes.object
}

export default Award

const styles = StyleSheet.create({
  container: {
    margin: _.wind
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
