/*
 * @Author: czy0729
 * @Date: 2024-04-03 22:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 02:24:06
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Squircle, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { ASSETS_AWARDS, HOST } from '@constants'
import { YEARS_BLOCKS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Blocks() {
  r(COMPONENT)

  const navigation = useNavigation()

  return useObserver(() => {
    const styles = memoStyles()
    const { width, height } = styles.item2021
    return (
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
            <Squircle width={width} height={height} radius={systemStore.setting.coverRadius}>
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
    )
  })
}

export default Blocks
