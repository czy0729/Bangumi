/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:59:04
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { SectionTitle as SectionTitleComp } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function SectionTitle({ title, type }) {
  const navigation = useNavigation()
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
}

export default ob(SectionTitle, COMPONENT)
