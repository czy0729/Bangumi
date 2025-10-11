/*
 * @Author: czy0729
 * @Date: 2024-01-31 16:53:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:26:35
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 贴贴模块 */
function Likes() {
  r(COMPONENT)

  const { value, handleSwitch } = useAsyncSwitchSetting('likes')

  return useObserver(() => (
    <Block>
      <Tip>贴贴</Tip>
      <ItemSetting
        hd='贴贴模块'
        information='帖子回复上面贴表情的功能，长按数字按钮展开贴过的用户列表。因在网页版随处可见，不建议关闭。'
        ft={
          <SwitchPro
            style={styles.switch}
            value={value}
            onSyncPress={() => {
              handleSwitch()

              t('超展开设置.切换', {
                title: '贴贴模块',
                checked: !value
              })
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
  ))
}

export default Likes
