/*
 * @Author: czy0729
 * @Date: 2024-04-04 02:01:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 02:06:51
 */
import React from 'react'
import { Flex, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { YEARS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Years(props, { navigation }) {
  const styles = memoStyles()
  return (
    <Flex wrap='wrap'>
      {YEARS.map((item, index) => (
        <Touchable
          key={item}
          style={stl(styles.item, index % _.portrait(2, 4) === 0 && styles.side)}
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
            radius={systemStore.setting.coverRadius}
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
}

export default obc(Years, COMPONENT)
