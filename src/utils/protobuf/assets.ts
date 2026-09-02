/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * 仅 native 端: bin 资源模块映射与本地加载 (metro asset + expo-asset)
 */
import { toByteArray } from 'base64-js'
import { Asset } from 'expo-asset'
import { logger } from '../dev'
import { FileSystem } from '../thirdParty/file-system'

import type { DataAssets } from './types'

const TAG = '@utils/protobuf/assets'

/** 数据集 → bin 资源模块, 惰性 require 返回 metro asset number */
const MODULES: Record<DataAssets, () => number> = {
  'bangumi-data': () => require('@assets/proto/bangumi-data/bin/index.bin') as number,
  anime: () => require('@assets/proto/anime/bin/index.bin') as number,
  manga: () => require('@assets/proto/manga/bin/index.bin') as number,
  game: () => require('@assets/proto/game/bin/index.bin') as number,
  adv: () => require('@assets/proto/adv/bin/index.bin') as number,
  catalog: () => require('@assets/proto/catalog/bin/index.bin') as number,
  ja: () => require('@assets/proto/ja/bin/index.bin') as number,
  d: () => require('@assets/proto/d/bin/index.bin') as number,
  katakana: () => require('@assets/proto/katakana/bin/index.bin') as number,
  'anime-ids': () => require('@assets/proto/anime-ids/bin/index.bin') as number,
  nsfw: () => require('@assets/proto/nsfw/bin/index.bin') as number,
  mono: () => require('@assets/proto/mono/bin/index.bin') as number
}

/** 读取本地 .bin 字节 */
export async function loadBinBytes(name: DataAssets): Promise<Uint8Array> {
  try {
    const asset = Asset.fromModule(MODULES[name]())

    if (!asset.localUri) await asset.downloadAsync()

    const base64String = await FileSystem.readAsStringAsync(asset.localUri, {
      encoding: FileSystem.EncodingType.Base64
    })
    return new Uint8Array(toByteArray(base64String))
  } catch (error) {
    logger.log(TAG, 'loadBinBytes', 'Error loading bin file', { name })
    return new Uint8Array()
  }
}
