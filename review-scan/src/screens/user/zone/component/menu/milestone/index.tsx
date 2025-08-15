/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 03:21:33
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Milestone() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Touchable
      onPress={() => {
        const { id, username } = $.usersInfo
        const userId = username || id
        navigation.push('Milestone', {
          userId
        })

        t('空间.跳转', {
          to: 'WordCloud',
          userId
        })
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-image-aspect-ratio' size={20} color={_.__colorPlain__} />
      </Flex>
    </Touchable>
  )
}

export default ob(Milestone)
