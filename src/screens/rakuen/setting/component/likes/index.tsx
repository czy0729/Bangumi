/*
 * @Author: czy0729
 * @Date: 2024-01-31 16:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 17:26:12
 */
import React from 'react'
import { SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { rakuenStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 贴贴模块 */
function Likes() {
  const { likes } = rakuenStore.setting
  return (
    <Block>
      <Tip>贴贴</Tip>
      <ItemSetting
        hd='贴贴模块'
        information={`近期新增的帖子回复上面贴表情的功能\n长按数字按钮展开贴过的用户列表\n因在网页版随处可见，不建议关闭`}
        ft={
          <SwitchPro
            style={styles.switch}
            value={likes}
            onSyncPress={() => {
              t('超展开设置.切换', {
                title: '贴贴模块',
                checked: !likes
              })
              rakuenStore.switchSetting('likes')
            }}
          />
        }
        thumb={getYuqueThumbs([
          '0/2023/png/386799/1684389118526-fa7066b5-5c37-4280-abe0-0325e05aa4c7.png',
          '0/2023/png/386799/1688332532626-a8958a19-e023-4cf8-bba6-4ca94f71752c.png'
        ])}
        withoutFeedback
      />
    </Block>
  )
}

export default ob(Likes, COMPONENT)
