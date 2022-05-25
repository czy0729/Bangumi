/*
 * @Author: czy0729
 * @Date: 2021-11-30 06:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:12:59
 */
import { useEffect } from 'react'
import { NativeEventEmitter, Clipboard } from 'react-native'

// @ts-ignore
import Shortcuts from 'react-native-actions-shortcuts'
import { navigationReference, appNavigate, getSetting } from '../app'
import { matchBgmUrl } from '../match'
import { info } from '../ui'

export default function useShortcutsAndroid() {
  useEffect(() => {
    setTimeout(() => {
      const shortcutsItems = [
        {
          type: 'Search',
          title: '搜索',
          iconName: 'md_search',
          data: {}
        },
        {
          type: 'Calendar',
          title: '每日放送',
          iconName: 'md_calendar',
          data: {}
        },
        {
          type: 'Link',
          title: '剪贴板',
          iconName: 'md_link',
          data: {}
        }
      ]

      if (getSetting().tinygrail) {
        shortcutsItems.push({
          type: 'Tinygrail',
          title: '小圣杯',
          iconName: 'md_trophy',
          data: {}
        })
      }

      try {
        Shortcuts.setShortcuts(shortcutsItems.reverse())
      } catch (error) {}
    }, 8000)
  }, [])

  useEffect(() => {
    const ShortcutsEmitter = new NativeEventEmitter(Shortcuts)
    const listener = item => {
      const navigation = navigationReference()
      if (!navigation) {
        return setTimeout(() => {
          listener(item)
        }, 300)
      }

      const { type } = item || {}
      if (type === 'Link') {
        // @issue 打开APP瞬间剪贴板读不到内容, 需要延迟
        setTimeout(async () => {
          const content = await Clipboard.getString()
          const urls = matchBgmUrl(content, true) || []
          const url = urls[0]
          if (!url) {
            info('没有检测到链接')
            return
          }

          appNavigate(url, navigation)
        }, 400)
      } else {
        navigation.push(type)
      }
    }

    ;(async function () {
      try {
        listener(await Shortcuts.getInitialShortcut())
      } catch (error) {}

      ShortcutsEmitter.addListener('onShortcutItemPressed', listener)
    })()

    return () => ShortcutsEmitter.removeListener('onShortcutItemPressed', listener)
  }, [])
}
