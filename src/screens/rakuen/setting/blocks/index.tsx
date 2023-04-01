/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 10:29:46
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Iconfont, Input } from '@components'
import { _, rakuenStore } from '@stores'
import { info } from '@utils'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import Block from '../../../user/setting/block'
import Tip from '../../../user/setting/tip'
import History from './../history'
import { memoStyles } from './styles'

function Blocks({ navigation, onNavigate = undefined }) {
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
    const { blockUserIds, blockKeywords, blockGroups } = rakuenStore.setting
    return (
      <View style={styles.container}>
        {/* 屏蔽用户 */}
        <Block>
          <Tip>屏蔽用户（对条目评论、时间胶囊、超展开相关信息生效）</Tip>
          <History
            navigation={navigation}
            data={blockUserIds}
            showAvatar
            onNavigate={onNavigate}
            onDelete={(item: string) => {
              t('超展开设置.取消用户', {
                item
              })
              rakuenStore.deleteBlockUser(item)
            }}
          />
        </Block>

        {/* 屏蔽关键字 */}
        <Block>
          <Tip>屏蔽关键字（对超展开标题、帖子正文内容生效）</Tip>
          <History
            data={blockKeywords}
            onDelete={(item: string) => {
              t('超展开设置.取消关键字', {
                item
              })
              rakuenStore.deleteBlockKeyword(item)
            }}
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
            data={blockGroups}
            onDelete={(item: string) => {
              t('超展开设置.取消关键字', {
                item
              })
              rakuenStore.deleteBlockGroup(item)
            }}
          />
        </Block>
      </View>
    )
  })
}

export default Blocks
