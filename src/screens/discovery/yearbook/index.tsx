/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:50:22
 */
import React from 'react'
import { Header, Page, ScrollView, Touchable, Image, Flex, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Award2022 from '../index/award-2022'
import { YEARS } from './ds'
import { memoStyles } from './styles'

const Yearbook = ({ navigation }) => {
  return useObserver(() => {
    const styles = memoStyles()
    const num = _.portrait(2, 4)
    return (
      <>
        <Header title='Bangumi年鉴' hm={['discovery/yearbook', 'Yearbook']} />
        <Page>
          <ScrollView contentContainerStyle={styles.container} scrollToTop>
            <Award2022
              navigation={navigation}
              width={styles.item2021.width}
              height={styles.item2021.height}
            />
            <Flex wrap='wrap'>
              <Touchable
                style={styles.item2021}
                animate
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
                  src={require('@assets/images/static/2021.png')}
                  size={styles.item2021.width}
                  height={styles.item2021.height}
                  placeholder={false}
                  resizeMode='contain'
                />
              </Touchable>
              <Touchable
                style={styles.item2020}
                animate
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
                  src={require('@assets/images/static/2020.png')}
                  size={styles.item2020.width}
                  height={styles.item2020.height}
                  placeholder={false}
                  resizeMode='contain'
                />
              </Touchable>
              <Touchable
                style={styles.item2019}
                animate
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
                    src={require('@assets/images/static/2019.png')}
                    size={styles.item2019.width - 32}
                    height={styles.item2019.height}
                    placeholder={false}
                    resizeMode='contain'
                  />
                </Flex>
              </Touchable>
              <Touchable
                style={styles.item2018}
                animate
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
                  src={require('@assets/images/static/2018.png')}
                  size={styles.item2018.width}
                  height={styles.item2018.height}
                  placeholder={false}
                />
              </Touchable>
            </Flex>
            <Flex wrap='wrap'>
              {YEARS.map((item, index) => (
                <Touchable
                  key={item}
                  style={_.container.touch}
                  animate
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
                    style={stl(styles.item, index % num === 0 && styles.left)}
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
        </Page>
      </>
    )
  })
}

export default Yearbook
