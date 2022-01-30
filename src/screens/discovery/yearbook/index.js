/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-31 00:53:48
 */
import React from 'react'
import { ScrollView, Touchable, Image, Flex, Text } from '@components'
import { _ } from '@stores'
import { withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Img2021 from '@assets/images/year_2021.png'

const title = 'Bangumi年鉴'
const cdn =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210413/data/award/title'
const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

export default
@withHeader({
  screen: title,
  hm: ['discovery/yearbook', 'Yearbook']
})
@obc
class Yearbook extends React.Component {
  get num() {
    return _.portrait(2, 4)
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
        <Flex wrap='wrap'>
          <Touchable
            style={this.styles.item2021}
            onPress={() => {
              t('Bangumi年鉴.跳转', {
                to: 'Award',
                year: 2021
              })

              navigation.push('Award', {
                uri: `${HOST}/award/2021`
              })
            }}
          >
            <Image
              src={Img2021}
              size={this.styles.item2021.width}
              height={this.styles.item2021.height}
              placeholder={false}
              resizeMode='contain'
            />
          </Touchable>
          <Touchable
            style={this.styles.item2020}
            onPress={() => {
              t('Bangumi年鉴.跳转', {
                to: 'Award',
                year: 2020
              })

              navigation.push('Award', {
                uri: `${HOST}/award/2020`
              })
            }}
          >
            <Image
              src={`${cdn}/2020.png`}
              size={this.styles.item2020.width}
              height={this.styles.item2020.height}
              placeholder={false}
              resizeMode='contain'
            />
          </Touchable>
          <Touchable
            style={this.styles.item2019}
            onPress={() => {
              t('Bangumi年鉴.跳转', {
                to: 'Award',
                year: 2019
              })

              navigation.push('Award', {
                uri: `${HOST}/award/2019`
              })
            }}
          >
            <Flex justify='center'>
              <Image
                src={`${cdn}/2019.png`}
                size={this.styles.item2019.width - 32}
                height={this.styles.item2019.height}
                placeholder={false}
                resizeMode='contain'
              />
            </Flex>
          </Touchable>
          <Touchable
            style={this.styles.item2018}
            onPress={() => {
              t('Bangumi年鉴.跳转', {
                to: 'Award',
                year: 2018
              })

              navigation.push('Award', {
                uri: `${HOST}/award/2018`
              })
            }}
          >
            <Image
              src={`${cdn}/2018.png`}
              size={this.styles.item2018.width}
              height={this.styles.item2018.height}
              placeholder={false}
            />
          </Touchable>
        </Flex>
        <Flex wrap='wrap'>
          {years.map((item, index) => (
            <Touchable
              key={item}
              style={_.container.touch}
              onPress={() => {
                t('Bangumi年鉴.跳转', {
                  to: 'Award',
                  year: item
                })

                navigation.push('Award', {
                  uri: `${HOST}/award/${item}`
                })
              }}
            >
              <Flex
                style={[this.styles.item, index % this.num === 0 && this.styles.left]}
                justify='center'
                direction='column'
              >
                <Text size={18} type={_.select('plain', 'title')} bold>
                  {item}
                </Text>
              </Flex>
            </Touchable>
          ))}
        </Flex>
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => {
  const num = _.portrait(1, 2)
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  const height = width * 0.4

  const numSm = _.portrait(2, 4)
  const widthSm = (_.window.width - 2 * _.wind - _.md * (numSm - 1)) / numSm
  return {
    container: {
      paddingHorizontal: _.wind,
      paddingBottom: _.bottom
    },
    item2021: {
      width,
      height,
      marginTop: _.md,
      backgroundColor: '#ebf3ec',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2020: {
      width,
      height,
      marginTop: _.md,
      backgroundColor: 'rgb(236, 243, 236)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2019: {
      width,
      height,
      marginTop: _.md,
      marginLeft: num === 2 ? _.md : 0,
      backgroundColor: 'rgb(54, 63, 69)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2018: {
      width,
      height,
      marginTop: _.md,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item: {
      width: widthSm,
      height: widthSm,
      marginTop: _.md,
      marginLeft: _.md,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd
    },
    left: {
      marginLeft: 0
    }
  }
})
