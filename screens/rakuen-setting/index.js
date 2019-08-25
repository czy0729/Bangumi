/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 18:06:46
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Switch } from '@ant-design/react-native'
import { Text } from '@components'
import { ItemSetting } from '@screens/_'
import { rakuenStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import History from './history'

const title = '超展开设置'

export default
@withHeader()
@observer
class Setting extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    hm('rakuen-settings', title)
  }

  render() {
    const { quote, isBlockDefaultUser, isMarkOldTopic } = rakuenStore.setting
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.flex}
      >
        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          基本
        </Text>
        <ItemSetting
          style={_.mt.sm}
          hd='帖子展开引用'
          ft={<Switch checked={quote} onChange={rakuenStore.switchQuote} />}
          withoutFeedback
        />
        <ItemSetting
          border
          hd='屏蔽疑似的广告姬'
          ft={
            <Switch
              checked={isBlockDefaultUser}
              onChange={rakuenStore.switchIsBlockDefaultUser}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          border
          hd='标记坟贴'
          ft={
            <Switch
              checked={isMarkOldTopic}
              onChange={rakuenStore.switchIsMarkOldTopic}
            />
          }
          withoutFeedback
        />

        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          屏蔽中的关键字
        </Text>
        <History
          style={_.mt.sm}
          data={rakuenStore.setting.blockGroups}
          onDelete={rakuenStore.deleteBlockGroup}
        />

        <Text style={[_.container.wind, _.mt.md]} type='sub'>
          屏蔽中的用户
        </Text>
        <History
          style={_.mt.sm}
          data={rakuenStore.setting.blockUserIds}
          onDelete={rakuenStore.deleteBlockUser}
        />
      </ScrollView>
    )
  }
}
