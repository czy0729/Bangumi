/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:59:14
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp, UserStatus } from '@components'
import { _ } from '@stores'
import { getTimestamp, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { memoStyles } from './styles'

function Avatar({ avatar, nickname, userId, lastActiveDate }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const lastActiveTS = getTimestamp(lastActiveDate.replace('T', ' '))
  return (
    <View style={_.mt.md}>
      <UserStatus style={styles.userStatus} last={lastActiveTS}>
        <AvatarComp
          src={tinygrailOSS(avatar)}
          size={36}
          borderColor='transparent'
          skeletonType='tinygrail'
          name={nickname}
          onPress={() => {
            t('番市首富.跳转', {
              to: 'Zone',
              userId
            })

            navigation.push('Zone', {
              userId,
              from: 'tinygrail'
            })
          }}
        />
      </UserStatus>
    </View>
  )
}

export default ob(Avatar)
