/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:45:02
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { SectionTitle as CompSectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SectionTitle({ title, type }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <CompSectionTitle
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
    </CompSectionTitle>
  )
}

export default obc(SectionTitle, COMPONENT)
