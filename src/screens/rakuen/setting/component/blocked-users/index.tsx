/*
 * @Author: czy0729
 * @Date: 2024-01-31 19:17:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 21:19:23
 */
import React, { useCallback, useState } from 'react'
import { Flex, Iconfont, Input, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { info } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { Fn, Navigation } from '@types'
import History from '../history'
import { handleDeleteBlockUser } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 用户绝交 */
function BlockedUsers({ navigation, onNavigate }: { navigation: Navigation; onNavigate?: Fn }) {
  r(COMPONENT)

  const [keyword, setKeyword] = useState('')
  const onChange = useCallback(keyword => {
    setKeyword(keyword.trim())
  }, [])
  const onSubmit = useCallback(() => {
    if (!keyword.length) {
      info('不能为空')
      return
    }

    // rakuenStore.addBlockKeyword(keyword)
    setKeyword('')
  }, [keyword])

  return useObserver(() => (
    <Block>
      <Tip>与以下用户绝交（不再看到用户的所有话题、评论、日志、私信、提醒）</Tip>
      <History
        navigation={navigation}
        data={rakuenStore.blockedUsers.list}
        showAvatar
        onNavigate={onNavigate}
        onDelete={(item: string) => handleDeleteBlockUser(item)}
      />
      <Flex style={styles.section}>
        <Flex.Item>
          <Input
            style={styles.input}
            value={keyword}
            placeholder='输入用户 ID 或用户名'
            returnKeyType='search'
            returnKeyLabel='添加'
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
          />
        </Flex.Item>
        <Touchable style={_.ml.md} onPress={onSubmit}>
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-add' size={24} />
          </Flex>
        </Touchable>
      </Flex>
    </Block>
  ))
}

export default BlockedUsers
