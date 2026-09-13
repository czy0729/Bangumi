/*
 * @Author: czy0729
 * @Date: 2024-01-31 20:18:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-12 03:24:11
 */
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, flexStyle, Iconfont, Input, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { info, stl } from '@utils'
import { r } from '@utils/dev'
import Block from '@screens/user/setting/component/block'
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

  return (
    <Block tip='屏蔽关键字'>
      <History
        data={rakuenStore.setting.blockKeywords}
        information='对超展开标题、帖子正文生效'
        onDelete={handleDelete}
      />
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
        <Touchable
          style={stl(flexStyle({ justify: 'center' }), _.ml.md, styles.icon)}
          onPress={handleSubmit}
        >
          <Iconfont name='md-add' size={24} />
        </Touchable>
      </Flex>
    </Block>
  )
}

export default observer(BlockedKeyword)
