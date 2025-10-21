/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 13:21:35
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { SectionTitle as SectionTitleComp } from '@_'
import { _ } from '@stores'
import { withT } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function SectionTitle({ title, type }: Props) {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <SectionTitleComp
        style={styles.section}
        right={
          <Touchable
            style={styles.touch}
            onPress={withT(
              () => {
                navigation.push('Channel', {
                  type
                })
              },
              '发现.跳转',
              {
                to: 'Channel',
                title,
                from: 'SectionTitle'
              }
            )}
          >
            <Flex>
              <Text>　　</Text>
              <Iconfont name='md-navigate-next' color={_.colorTitle} />
            </Flex>
          </Touchable>
        }
      >
        {title}
      </SectionTitleComp>
    )
  })
}

export default SectionTitle
