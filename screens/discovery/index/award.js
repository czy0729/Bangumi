/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 19:55:56
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Image, Text, Flex } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { HOST } from '@constants'

function Award(props, { navigation }) {
  const styles = memoStyles()
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Touchable
        style={styles.item}
        withoutFeedback
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2018
          })
          navigation.push('Award', {
            uri: `${HOST}/award/2018`
          })
        }}
      >
        <View style={styles.borderAward} />
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
      {[2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map((item, index) => (
        <Touchable
          key={item}
          style={_.ml.md}
          withoutFeedback
          onPress={() => {
            t('发现.跳转', {
              to: 'Award',
              year: item
            })
            navigation.push('Award', {
              uri: `${HOST}/award/${item}`
            })
          }}
        >
          <View style={styles.border} />
          <Flex style={styles.itemSquare} justify='center' direction='column'>
            {index === 0 && (
              <Text size={20} type={_.select('plain', 'title')} bold>
                BEST OF
              </Text>
            )}
            <Text size={20} type={_.select('plain', 'title')} bold>
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

export default observer(Award)

const memoStyles = _.memoStyles(_ => ({
  container: {
    padding: _.wind
  },
  item: {
    width: 312,
    paddingRight: 4,
    borderWidth: _.select(0, 1),
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd
  },
  itemSquare: {
    width: 148,
    height: 148,
    marginRight: 4,
    backgroundColor: _.select(_.colorDark, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  borderAward: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    width: 48,
    height: 148,
    backgroundColor: _.select(_.colorDark, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  border: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    width: 48,
    height: 148,
    backgroundColor: _.colorDanger,
    borderRadius: _.radiusMd
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
}))
