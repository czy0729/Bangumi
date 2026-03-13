/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:22:51
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { rakuenStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import BlockedKeyword from '../blocked-keyword'
import BlockedUsers from '../blocked-users'
import History from '../history'
import { handleDeleteBlockGroup } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

/** 屏蔽 */
function Blockeds({ navigation, onNavigate }: Props) {
  r(COMPONENT)

  const handleDelete = useCallback((item: string) => {
    handleDeleteBlockGroup(item)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <View style={styles.container}>
        <BlockedUsers navigation={navigation} onNavigate={onNavigate} />
        <BlockedKeyword />
        <Block>
          <Tip>屏蔽小组 / 条目（对帖子所属小组名生效）</Tip>
          <History data={rakuenStore.setting.blockGroups} onDelete={handleDelete} />
        </Block>
      </View>
    )
  })
}

export default Blockeds
