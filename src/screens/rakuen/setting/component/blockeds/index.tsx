/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 21:19:41
 */
import React from 'react'
import { View } from 'react-native'
import { rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { Fn, Navigation } from '@types'
import BlockedKeyword from '../blocked-keyword'
import BlockedUsers from '../blocked-users'
import History from '../history'
import { handleDeleteBlockGroup } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/** 屏蔽 */
function Blockeds({ navigation, onNavigate }: { navigation: Navigation; onNavigate?: Fn }) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <BlockedUsers navigation={navigation} onNavigate={onNavigate} />
      <BlockedKeyword />
      <Block>
        <Tip>屏蔽小组 / 条目（对帖子所属小组名生效）</Tip>
        <History
          data={rakuenStore.setting.blockGroups}
          onDelete={(item: string) => handleDeleteBlockGroup(item)}
        />
      </Block>
    </View>
  )
}

export default ob(Blockeds, COMPONENT)
