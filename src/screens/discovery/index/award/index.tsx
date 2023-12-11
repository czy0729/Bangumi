/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 23:20:13
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Touchable, Squircle, Image, Text, Flex } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { rerender } from '@utils/dev'
import { ASSETS_AWARDS, HOST, TEXT_ONLY } from '@constants'
import ScrollViewHorizontal from './scroll-view-horizontal'
import Award2022 from '../award-2022'
import Award2021 from '../award-2021'
import { memoStyles } from './styles'

const YEARS = [2020, 2019, 2018] as const

function Award({ navigation }) {
  rerender('Discovery.Award')

  const [scrolled, setScrolled] = useState(_.isPad)
  const onScroll = useCallback(evt => {
    const { x } = evt.nativeEvent.contentOffset
    if (x >= 20) setScrolled(true)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const { coverRadius } = systemStore.setting
    return (
      <ScrollViewHorizontal
        contentContainerStyle={styles.container}
        onScroll={scrolled ? undefined : onScroll}
      >
        <Award2022 navigation={navigation} />
        <Award2021 />
        {!TEXT_ONLY && scrolled && (
          <>
            {YEARS.map(year => {
              const { width, height } = styles.item
              return (
                <Touchable
                  key={year}
                  style={styles.item}
                  animate
                  onPress={() => {
                    t('发现.跳转', {
                      to: 'Award',
                      year: year,
                      from: 'Award'
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
                        size={width - (year === 2019 ? 32 : 0)}
                        height={height}
                        placeholder={false}
                        resizeMode={year !== 2018 ? 'contain' : 'cover'}
                      />
                    </View>
                  </Squircle>
                </Touchable>
              )
            })}
            <Touchable
              style={_.container.touch}
              animate
              onPress={() => {
                t('发现.跳转', {
                  to: 'Yearbook',
                  from: 'Award'
                })

                navigation.push('Yearbook')
              }}
            >
              <Squircle width={styles.itemMore.height} radius={coverRadius}>
                <Flex style={styles.itemMore} justify='center' direction='column'>
                  <Text size={18} type={_.select('plain', 'title')} bold>
                    更多
                  </Text>
                  <Text size={18} type={_.select('plain', 'title')} bold>
                    年鉴
                  </Text>
                </Flex>
              </Squircle>
            </Touchable>
          </>
        )}
      </ScrollViewHorizontal>
    )
  })
}

export default Award
