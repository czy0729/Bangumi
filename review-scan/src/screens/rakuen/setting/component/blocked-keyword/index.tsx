/*
 * @Author: czy0729
 * @Date: 2024-01-31 20:18:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 21:19:15
 */
import React, { useCallback, useState } from 'react'
import { Flex, Iconfont, Input, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { info } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import History from '../history'
import { handleDeleteKeyword } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 屏蔽关键字 */
function BlockedKeyword() {
  r(COMPONENT)

  const [keyword, setKeyword] = useState('')
  const handleChange = useCallback((keyword: string) => {
    setKeyword(keyword.trim())
  }, [])
  const handleSubmit = useCallback(() => {
    if (!keyword.length) {
      info('不能为空')
      return
    }

    rakuenStore.addBlockKeyword(keyword)
    setKeyword('')
  }, [keyword])
  const handleDelete = useCallback((item: string) => {
    handleDeleteKeyword(item)
  }, [])

  return useObserver(() => (
    <Block>
      <Tip>屏蔽关键字（对超展开标题、帖子正文生效）</Tip>
      <History data={rakuenStore.setting.blockKeywords} onDelete={handleDelete} />
      <Flex style={styles.section}>
        <Flex.Item>
          <Input
            style={styles.input}
            value={keyword}
            placeholder='输入关键字'
            returnKeyType='search'
            returnKeyLabel='添加'
            onChangeText={handleChange}
            onSubmitEditing={handleSubmit}
          />
        </Flex.Item>
        <Touchable style={_.ml.md} onPress={handleSubmit}>
          <Flex style={styles.icon} justify='center'>
            <Iconfont name='md-add' size={24} />
          </Flex>
        </Touchable>
      </Flex>
    </Block>
  ))
}

export default BlockedKeyword
