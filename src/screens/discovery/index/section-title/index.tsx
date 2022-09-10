/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 07:33:04
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle as CompSectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function SectionTitle({ title, type }, { navigation }: Ctx) {
  global.rerender('Discovery.SectionTitle')

  const styles = memoStyles()
  return (
    <CompSectionTitle
      style={styles.section}
      right={
        <Touchable
          style={styles.touch}
          onPress={() => {
            t('发现.跳转', {
              to: 'Channel',
              title
            })

            navigation.push('Channel', {
              type
            })
          }}
        >
          <Flex>
            <Text>频道</Text>
            <Iconfont name='md-navigate-next' color={_.colorTitle} />
          </Flex>
        </Touchable>
      }
    >
      {title}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle)
