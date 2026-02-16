/*
 * @Author: czy0729
 * @Date: 2024-01-31 17:57:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:32:50
 */
import React from 'react'
import { Flex, SwitchPro, Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { uiStore } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 媒体信息块 */
function Media() {
  r(COMPONENT)

  const { value: matchLink, handleSwitch: handleSwitchMatchLink } =
    useAsyncSwitchSetting('matchLink')
  const { value: acSearchV2, handleSwitch: handleSwitchAcSearch } =
    useAsyncSwitchSetting('acSearchV2')
  const { value: acSearchPopable, handleSwitch: handleSwitchAcSearchPopable } =
    useAsyncSwitchSetting('acSearchPopable')

  return useObserver(() => (
    <Block>
      <Tip>媒体信息块</Tip>

      {/* 楼层链接显示成信息块 */}
      <ItemSetting
        hd='楼层链接显示成信息块'
        information='若楼层出现特定页面链接，使用不同的 UI 代替'
        ft={
          <SwitchPro
            style={styles.switch}
            value={matchLink}
            onSyncPress={() => {
              handleSwitchMatchLink()

              t('超展开设置.切换', {
                title: '显示信息块',
                checked: !matchLink
              })
            }}
          />
        }
        withoutFeedback
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661155814563-74ea244f-c48c-49d2-8fa0-be0bc220724e.png',
          '0/2022/png/386799/1661155854261-970ecf62-6eaa-4b0f-b280-347233ada8f1.png'
        ])}
      />

      {/* 楼层内容猜测条目 */}
      <ItemSetting
        hd='楼层内容猜测条目'
        information='使用条目词库对楼层文字进行猜测匹配，若匹配成功文字下方显示下划线，点击直接去到条目页面'
        ft={
          <SwitchPro
            style={styles.switch}
            value={acSearchV2}
            onSyncPress={() => {
              handleSwitchAcSearch()

              t('超展开设置.切换', {
                title: '猜测条目',
                checked: !acSearchV2
              })
            }}
          />
        }
        withoutFeedback
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661156697962-47872ab9-dd71-40e7-84c6-842d014fa85e.png',
          '0/2022/png/386799/1661156404852-5419bd25-408e-49b3-9e0a-57b480b54ecf.png'
        ])}
      />

      {/* 猜测条目先显示缩略信息 */}
      {acSearchV2 && (
        <ItemSetting
          hd='猜测条目先显示缩略信息'
          information='若猜测命中关键字，为了不打断阅读，会在图层上方先显示缩略信息，再次点击才会进入条目页面'
          ft={
            <SwitchPro
              style={styles.switch}
              value={acSearchPopable}
              onSyncPress={() => {
                handleSwitchAcSearchPopable()

                t('超展开设置.切换', {
                  title: '猜测条目',
                  checked: !acSearchV2
                })
              }}
            />
          }
          withoutFeedback
          thumb={getYuqueThumbs([
            '0/2022/png/386799/1661157003238-c24ee52e-85ba-43b1-81fb-71e2596c6562.png',
            '0/2022/png/386799/1661157009090-307ff23e-1734-4914-8c8e-1537faa7e9f9.png'
          ])}
          sub
        />
      )}

      <Flex style={styles.acSearchPopable}>
        <Text size={13}>试一试∶</Text>
        <Touchable
          onPress={({ pageX, pageY }) => {
            uiStore.setXY(pageX, pageY - (IOS ? 0 : 12))
            uiStore.showPopableSubject({
              subjectId: 364450
            })
            feedback(true)
          }}
        >
          <Text size={13} bold underline>
            石蒜
          </Text>
        </Touchable>
        <Text size={13}>物语是什么鬼翻译(bgm38)</Text>
      </Flex>
    </Block>
  ))
}

export default Media
