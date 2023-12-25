/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:20:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:23:17
 */
/*
 * @Author: czy0729
 * @Date: 2019-05-29 16:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:19:55
 */
import React from 'react'
import { Touchable, Squircle, Text, Flex } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function More(props, { navigation }: Ctx) {
  rerender('Discovery.Award.More')

  const styles = memoStyles()
  const { width, height } = styles.more
  const { coverRadius } = systemStore.setting
  const type = _.select('plain', 'title')
  return (
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
      <Squircle width={width} height={height} radius={coverRadius}>
        <Flex style={styles.more} justify='center' direction='column'>
          <Text size={18} type={type} bold>
            更多
          </Text>
          <Text size={18} type={type} bold>
            年鉴
          </Text>
        </Flex>
      </Squircle>
    </Touchable>
  )
}

export default obc(More)
