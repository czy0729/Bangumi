/*
 * @Author: czy0729
 * @Date: 2024-10-15 04:24:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 21:20:50
 */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Input as InputComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { useNavigation } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Input() {
  const navigation = useNavigation(COMPONENT)
  const [username, setUsername] = useState('')

  const handleChange = useCallback(
    (text: string) => {
      setUsername(text.trim())
    },
    [setUsername]
  )
  const handleNavigate = useCallback(() => {
    if (!username) {
      info('用户 ID 不能为空')
      return
    }

    navigation.replace('Milestone', {
      userId: username
    })
  }, [navigation, username])

  return (
    <Flex style={styles.wrap}>
      <Flex.Item>
        <InputComp
          style={styles.ipt}
          value={username}
          placeholder='可输入用户 ID 直达'
          onChangeText={handleChange}
          onSubmitEditing={handleNavigate}
        />
      </Flex.Item>
      <IconTouchable style={_.ml.md} name='md-arrow-forward' onPress={handleNavigate} />
    </Flex>
  )
}

export default observer(Input)
