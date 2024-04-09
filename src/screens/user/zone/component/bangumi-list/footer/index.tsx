/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:59:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 08:27:17
 */
import React from 'react'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import Lock from '../../lock'
import { styles } from './styles'

function Footer(props, { $, navigation }: Ctx) {
  return (
    <Flex style={_.mt.lg} justify='center'>
      <Touchable
        style={styles.touch}
        onPress={() => {
          t('空间.跳转', {
            to: 'User'
          })

          $.navigateToUser(navigation)
        }}
      >
        <Text type={_.select('desc', 'main')} bold>
          查看TA的所有收藏
        </Text>
        <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
      </Touchable>
    </Flex>
  )
}

export default obc(Footer)
