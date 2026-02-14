/*
 * @Author: czy0729
 * @Date: 2024-04-04 02:01:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-13 15:37:27
 */
import React from 'react'
import { Flex, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { withT } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { YEARS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Years() {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Flex wrap='wrap'>
        {YEARS.map((item, index) => (
          <Touchable
            key={item}
            style={stl(styles.item, index % _.portrait(2, 4) === 0 && styles.side)}
            animate
            onPress={withT(
              () => {
                navigation.push('Award', {
                  uri: `${HOST}/award/${item}`
                })
              },
              'Bangumi年鉴.跳转',
              {
                to: 'Award',
                year: item
              }
            )}
          >
            <Squircle
              width={styles.itemBody.width}
              height={styles.itemBody.height}
              radius={systemStore.coverRadius}
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
    )
  })
}

export default Years
