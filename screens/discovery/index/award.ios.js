/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-26 10:50:31
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Image, Text, Flex } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import ImageHero from '@assets/images/hero.png'
import ImageHeroTitle from '@assets/images/hero_title_ios.png'

const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
const itemWidth = 132

function Award(props, { navigation }) {
  const styles = memoStyles()
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Touchable
        style={_.mr.md}
        withoutFeedback
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2019
          })

          navigation.push('Award', {
            uri: `${HOST}/award/2019`
          })
        }}
      >
        <View style={styles.border} />
        <Flex style={styles.itemSquare} justify='center' direction='column'>
          <Text size={18} type={_.select('plain', 'title')} bold>
            2019
          </Text>
          <Text size={16} type={_.select('plain', 'title')} bold>
            年鉴
          </Text>
        </Flex>
      </Touchable>
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
          <Image src={ImageHero} size={itemWidth} placeholder={false} />
        </View>
        <Image
          style={styles.imageTitle}
          src={ImageHeroTitle}
          size={itemWidth * 0.92}
          height={itemWidth * 0.92}
          resizeMode='contain'
          placeholder={false}
        />
      </Touchable>
      {years.map(item => (
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
            <Text size={18} type={_.select('plain', 'title')} bold>
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
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  item: {
    width: itemWidth * 2,
    borderRadius: _.radiusMd
  },
  itemSquare: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  image: {
    backgroundColor: _.colorDanger,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  imageTitle: {
    position: 'absolute',
    top: 4,
    right: 8
  }
}))
