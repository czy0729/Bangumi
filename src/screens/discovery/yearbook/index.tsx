/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:37:53
 */
import React from 'react'
import { View } from 'react-native'
import {
  Component,
  Flex,
  Header,
  Image,
  Page,
  ScrollView,
  Squircle,
  Text,
  Touchable
} from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, HOST } from '@constants'
import Award2022 from '../index/component/award-2022'
import { YEARS } from './ds'
import { memoStyles } from './styles'

const YEARS_BLOCKS = [2021, 2020, 2019, 2018] as const

const Yearbook = ({ navigation }) => {
  return useObserver(() => {
    const styles = memoStyles()
    const { width, height } = styles.item2021
    const { coverRadius } = systemStore.setting
    const num = _.portrait(2, 4)
    return (
      <Component id='screen-yearbook'>
        <Header title='Bangumi年鉴' hm={['discovery/yearbook', 'Yearbook']} />
        <Page>
          <ScrollView contentContainerStyle={styles.container} scrollToTop>
            <Award2022
              navigation={navigation}
              width={styles.item2021.width}
              height={styles.item2021.height}
            />
            <Flex wrap='wrap'>
              {YEARS_BLOCKS.map(year => (
                <Touchable
                  key={String(year)}
                  style={_.mt.md}
                  animate
                  onPress={() => {
                    t('Bangumi年鉴.跳转', {
                      to: 'Award',
                      year: year
                    })

                    navigation.push('Award', {
                      uri: `${HOST}/award/${year}`
                    })
                  }}
                >
                  <Squircle width={width} height={height} radius={coverRadius}>
                    <View style={styles[`item${year}`]}>
                      <Image
                        src={ASSETS_AWARDS[year]}
                        size={width}
                        height={height}
                        placeholder={false}
                        resizeMode={year === 2018 ? 'cover' : 'contain'}
                      />
                    </View>
                  </Squircle>
                </Touchable>
              ))}
            </Flex>
            <Flex wrap='wrap'>
              {YEARS.map((item, index) => (
                <Touchable
                  key={item}
                  style={stl(styles.item, index % num === 0 && styles.side)}
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
                  <Squircle
                    width={styles.itemBody.width}
                    height={styles.itemBody.height}
                    radius={coverRadius}
                  >
                    <Flex style={styles.itemBody} justify='center' direction='column'>
                      <Text size={18} type={_.select('plain', 'title')} bold>
                        {item}
                      </Text>
                    </Flex>
                  </Squircle>
                </Touchable>
              ))}
            </Flex>
          </ScrollView>
        </Page>
      </Component>
    )
  })
}

export default Yearbook
