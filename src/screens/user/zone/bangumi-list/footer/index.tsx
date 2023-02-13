/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:59:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 16:12:32
 */
import React from 'react'
import { Touchable, Text, Heatmap, Flex } from '@components'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import Lock from '../lock'
import U from '../u'
import { styles } from './styles'

function Footer(props, { $, navigation }: Ctx) {
  const { ban } = $.users
  if (ban) {
    return (
      <>
        <Lock text={ban} />
        {userStore.isDeveloper && <U username={$.usersInfo.username} />}
      </>
    )
  }

  return (
    <>
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
      {userStore.isDeveloper && <U username={$.usersInfo.username} />}
    </>
  )
}

export default obc(Footer)
