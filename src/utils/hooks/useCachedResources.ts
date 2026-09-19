/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 00:49:12
 */
import { useState } from 'react'
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { devLog } from '@components/dev/utils'
import { setComponentsDefaultProps } from '@components/text/utils'
import Stores, { systemStore } from '@stores'
import { logger } from '@utils/dev'
import { restoreEchProxy, setupEchLifecycle } from '@utils/proxy/ech'
import { postTask } from '@utils/scheduler'
import { bootApp } from '../app'
import useMount from './useMount'

async function loadBaseFonts(): Promise<boolean> {
  // Metro 资源 require 返回资源注册表 ID (number), 属 FontSource 的合法形态
  await loadAsync({
    bgm: require('@assets/fonts/BgmV3_1.ttf') as number
  })
  await loadAsync({
    bgm2: require('@assets/fonts/BgmV3_2.ttf') as number,
    bgm3: require('@assets/fonts/BgmV3_3.ttf') as number
  })

  return true
}

let loadAppFontsLoaded = false

/** 加载思源幼圆子集字体 (已加载过直接返回) */
export async function loadAppFonts(): Promise<boolean> {
  if (loadAppFontsLoaded) return true

  loadAppFontsLoaded = true

  // 思源幼圆 (Resource Han Rounded CN)，原始文件约 13-14MB
  // 经 pyftsubset 子集化裁剪至 ~3MB，仅保留 GB2312 一级+二级常用字 (6,763 字)
  // 如需更新字表或重新生成，见 web/fontmin/subset.sh
  await loadAsync({
    rhrm: require('@assets/fonts/ResourceHanRoundedCN-Medium.min.ttf') as number,
    rhrb: require('@assets/fonts/ResourceHanRoundedCN-Bold.min.ttf') as number
  })

  return true
}

/**
 * 图标字体预加载, 延迟求值避免 glyphmap / ttf 进入启动链
 *
 * 失败只告警, 不阻断启动 (图标组件内部仍会自行加载字体)
 */
async function preloadIconFonts(): Promise<void> {
  try {
    return await (async () => {
      // 让出一帧, 避免与 bootApp 同 tick 同步求值三个图标模块
      await Promise.resolve()

      // require 参数必须为字面量, Metro 才能静态解析
      const Icons = (
        require('@components/@/vector-icons/AntDesign') as typeof import('@components/@/vector-icons/AntDesign')
      ).default
      const Ionicons = (
        require('@components/@/vector-icons/Ionicons') as typeof import('@components/@/vector-icons/Ionicons')
      ).default
      const MaterialIcons = (
        require('@components/@/vector-icons/MaterialIcons') as typeof import('@components/@/vector-icons/MaterialIcons')
      ).default

      await Promise.all([Icons.loadFont(), Ionicons.loadFont(), MaterialIcons.loadFont()])
    })()
  } catch (e) {
    logger.warn('useCachedResources', 'preloadIconFonts failed:', e)
  }
}

type LoadingResult = 0 | 1 | 2 | 3 | 99

/**
 * 保持启动屏并初始化 APP 资源 (Stores / 字体 / ECH 代理等)
 *
 * @returns 加载进度: `0` 初始化中 / `1` Stores 完成 / `2` bgm 字体已派发 / `3` 全部完成 / `99` 异常
 */
export default function useCachedResources(): LoadingResult {
  // 保持启动屏
  SplashScreen.preventAutoHideAsync()

  const [state, setState] = useState<LoadingResult>(0)
  useMount(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // App 初始化
        bootApp()

        // 图标字体预加载, 与 Stores 初始化并行
        const iconFonts = preloadIconFonts()

        // Stores 初始化
        const settings = await Stores.init()
        setState(1)

        // 恢复 ECH 代理 (仅当用户上次开启了 echProxyEnabled setting)
        restoreEchProxy(systemStore.setting.echProxyEnabled).catch(e => {
          logger.warn('useCachedResources', 'restoreEchProxy failed:', e)
        })

        // 注册生命周期监听: 后台→前台时自动检查 / 重建代理
        setupEchLifecycle()

        // 加载 bgm 表情特殊字体
        postTask(() => {
          loadBaseFonts()
        })
        setState(2)

        // 加载字体 (与图标字体预加载并行汇合, 避免额外串行等待)
        await Promise.all([
          iconFonts,
          typeof settings === 'object' && !settings.customFontFamily
            ? loadAppFonts()
            : Promise.resolve(true)
        ])
        setState(3)

        postTask(() => {
          setComponentsDefaultProps()
        })
      } catch (e) {
        devLog(String(e))
        setState(99)
      }
    }
    loadResourcesAndDataAsync()
  })

  return state
}
