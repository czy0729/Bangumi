/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-30 17:24:06
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { info } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { Fn, Navigation } from '@types'
import History from '../history'
import { handleDeleteBlockGroup, handleDeleteBlockUser, handleDeleteKeyword } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Blocks({ navigation, onNavigate }: { navigation: Navigation; onNavigate?: Fn }) {
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

    rakuenStore.addBlockKeyword(keyword)
    setKeyword('')
  }, [keyword])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.container}>
        {/* 屏蔽用户 */}
        <Block>
          <Tip>屏蔽用户（对条目评论、时间胶囊、超展开相关信息生效）</Tip>
          <History
            navigation={navigation}
            data={rakuenStore.setting.blockUserIds}
            showAvatar
            onNavigate={onNavigate}
            onDelete={(item: string) => handleDeleteBlockUser(item)}
          />
        </Block>

        {/* 屏蔽关键字 */}
        <Block>
          <Tip>屏蔽关键字（对超展开标题、帖子正文内容生效）</Tip>
          <History
            data={rakuenStore.setting.blockKeywords}
            onDelete={(item: string) => handleDeleteKeyword(item)}
          />
          <Flex style={styles.section}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={keyword}
                placeholder='输入关键字'
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

        {/* 屏蔽小组 / 条目 */}
        <Block>
          <Tip>屏蔽小组 / 条目（对帖子所属小组名生效）</Tip>
          <History
            data={rakuenStore.setting.blockGroups}
            onDelete={(item: string) => handleDeleteBlockGroup(item)}
          />
        </Block>
      </View>
    )
  })
}

export default Blocks
