/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:20:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:34:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Squircle, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function More() {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()
  const { width, height } = styles.more

  return (
    <Touchable
      style={_.container.touch}
      animate
      onPress={withT(
        () => {
          navigation.push('Yearbook')
        },
        '发现.跳转',
        {
          to: 'Yearbook',
          from: 'Award'
        }
      )}
    >
      <Squircle width={width} height={height} radius={systemStore.coverRadius}>
        <Flex style={styles.more} justify='center' direction='column'>
          <Text type='__plain__' size={18} bold>
            更多
          </Text>
          <Text type='__plain__' size={18} bold>
            年鉴
          </Text>
        </Flex>
      </Squircle>
    </Touchable>
  )
}

export default observer(More)
