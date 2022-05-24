/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 07:10:37
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Touchable, Image, Text, Flex } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Award2021 from './award-2021'

const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

function Award(props, { navigation }) {
  rerender('Discovery.Award')

  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <Award2021 />
      <Touchable
        style={[
          styles.item2020,
          {
            borderRadius: coverRadius
          }
        ]}
        onPress={() => {
          t('发现.跳转', {
            to: 'Award',
            year: 2020
          })

          navigation.push('Award', {
            uri: `${HOST}/award/2020`
          })
        }}
      >
        <Image
          src={require('@assets/images/static/2020.png')}
          size={styles.item2020.width}
          height={styles.item2020.height}
          placeholder={false}
          resizeMode='contain'
        />
      </Touchable>
      <Touchable
        style={[
          styles.item2019,
          {
            borderRadius: coverRadius
          }
        ]}
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
        <Image
          src={require('@assets/images/static/2019.png')}
          size={styles.item2020.width - 32}
          height={styles.item2020.height}
          placeholder={false}
          resizeMode='contain'
        />
      </Touchable>
      <Touchable
        style={[
          styles.item2018,
          {
            borderRadius: coverRadius
          }
        ]}
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
        <Image
          src={require('@assets/images/static/2018.png')}
          size={styles.item2018.width}
          height={styles.item2020.height}
          placeholder={false}
        />
      </Touchable>
      {years.map(item => (
        <Touchable
          key={item}
          style={[
            _.container.touch,
            _.ml.md,
            {
              borderRadius: coverRadius
            }
          ]}
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
          <Flex
            style={[
              styles.item,
              {
                borderRadius: coverRadius
              }
            ]}
            justify='center'
            direction='column'
          >
            <Text size={18} type={_.select('plain', 'title')} bold>
              {item}
            </Text>
            <Text size={18} type={_.select('plain', 'title')} bold>
              年鉴
            </Text>
          </Flex>
        </Touchable>
      ))}
    </ScrollView>
  )
}

export default obc(Award)

const memoStyles = _.memoStyles(() => {
  const width = _.device(128, 164)
  const widthLg = width * 2 + 16
  return {
    container: {
      paddingVertical: _.space,
      paddingHorizontal: _.windSm
    },
    item2021: {
      width: widthLg,
      height: width,
      marginRight: _.md,
      backgroundColor: '#ebf3ec',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2020: {
      width: widthLg,
      height: width,
      marginRight: _.md,
      backgroundColor: 'rgb(236, 243, 236)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2019: {
      width: widthLg,
      height: width,
      paddingLeft: 20,
      marginRight: _.md,
      backgroundColor: 'rgb(54, 63, 69)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2018: {
      width: widthLg,
      height: width,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item: {
      width,
      height: width,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd
    }
  }
})
