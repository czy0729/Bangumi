/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-15 23:12:14
 */
import React from 'react'
import { ScrollView, Touchable, Image, Flex, Text } from '@components'
import { _ } from '@stores'
import { withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'

const title = 'Bangumi年鉴'
const cdn =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-Static@20210413/data/award/title'

const num = _.device(2, 3)
const itemWidth = _.device(_.window.width - 2 * _.wind, _.window.contentWidth)
const itemHeight = itemWidth * 0.4
const itemSizeSm = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
const years = [2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]

export default
@withHeader({
  screen: title,
  hm: ['discovery/yearbook', 'Yearbook']
})
@obc
class Yearbook extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
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
            size={itemWidth}
            height={itemHeight}
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
          <Image
            src={`${cdn}/2019.png`}
            size={itemWidth - 32}
            height={itemHeight}
            placeholder={false}
            resizeMode='contain'
          />
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
            size={itemWidth}
            height={itemHeight}
            placeholder={false}
          />
        </Touchable>
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
                style={[
                  this.styles.item,
                  index % num === 0 && {
                    marginLeft: 0
                  }
                ]}
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item2020: {
    backgroundColor: 'rgb(236, 243, 236)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item2019: {
    width: itemWidth,
    paddingLeft: 20,
    marginTop: _.md,
    marginRight: _.md,
    backgroundColor: 'rgb(54, 63, 69)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item2018: {
    width: itemWidth,
    marginTop: _.md,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  item: {
    width: itemSizeSm,
    height: itemSizeSm,
    marginTop: _.md,
    marginLeft: _.md,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  }
}))
