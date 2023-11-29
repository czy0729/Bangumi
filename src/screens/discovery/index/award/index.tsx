/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 18:02:27
 */
import React, { useCallback, useState } from 'react'
import { Touchable, Image, Text, Flex } from '@components'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, HOST, TEXT_ONLY } from '@constants'
import ScrollViewHorizontal from './scroll-view-horizontal'
import Award2022 from '../award-2022'
import Award2021 from '../award-2021'
import { memoStyles } from './styles'

function Award({ navigation }) {
  // global.rerender('Discovery.Award')

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
            <Touchable
              style={[
                styles.item2020,
                {
                  borderRadius: coverRadius
                }
              ]}
              animate
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
                src={ASSETS_AWARDS[2020]}
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
              animate
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
                src={ASSETS_AWARDS[2019]}
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
              animate
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
                src={ASSETS_AWARDS[2018]}
                size={styles.item2018.width}
                height={styles.item2020.height}
                placeholder={false}
              />
            </Touchable>
            <Touchable
              style={[
                _.container.touch,
                _.ml.md,
                {
                  borderRadius: coverRadius
                }
              ]}
              animate
              onPress={() => {
                t('发现.跳转', {
                  to: 'Yearbook'
                })

                navigation.push('Yearbook')
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
                  更多
                </Text>
                <Text size={18} type={_.select('plain', 'title')} bold>
                  年鉴
                </Text>
              </Flex>
            </Touchable>
          </>
        )}
      </ScrollViewHorizontal>
    )
  })
}

export default Award
