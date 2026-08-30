/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:44:08
 *
 * 仅 native 端: proto/bin 资源模块映射与本地加载 (metro asset + expo-asset)
 */
import { toByteArray } from 'base64-js'
import { Asset } from 'expo-asset'
import { logger } from '../dev'
import { FileSystem } from '../thirdParty/file-system'

import type { DataAssets } from './types'

const TAG = '@utils/protobuf/assets'

/** 数据集 → proto/bin 资源模块, 惰性 require 返回 metro asset number */
const MODULES: Record<DataAssets, { proto: () => number; bin: () => number }> = {
  'bangumi-data': {
    proto: () => require('@assets/proto/bangumi-data/proto/index.proto') as number,
    bin: () => require('@assets/proto/bangumi-data/bin/index.bin') as number
  },
  anime: {
    proto: () => require('@assets/proto/anime/proto/index.proto') as number,
    bin: () => require('@assets/proto/anime/bin/index.bin') as number
  },
  manga: {
    proto: () => require('@assets/proto/manga/proto/index.proto') as number,
    bin: () => require('@assets/proto/manga/bin/index.bin') as number
  },
  game: {
    proto: () => require('@assets/proto/game/proto/index.proto') as number,
    bin: () => require('@assets/proto/game/bin/index.bin') as number
  },
  adv: {
    proto: () => require('@assets/proto/adv/proto/index.proto') as number,
    bin: () => require('@assets/proto/adv/bin/index.bin') as number
  },
  catalog: {
    proto: () => require('@assets/proto/catalog/proto/index.proto') as number,
    bin: () => require('@assets/proto/catalog/bin/index.bin') as number
  },
  ja: {
    proto: () => require('@assets/proto/ja/proto/index.proto') as number,
    bin: () => require('@assets/proto/ja/bin/index.bin') as number
  },
  d: {
    proto: () => require('@assets/proto/d/proto/index.proto') as number,
    bin: () => require('@assets/proto/d/bin/index.bin') as number
  },
  katakana: {
    proto: () => require('@assets/proto/katakana/proto/index.proto') as number,
    bin: () => require('@assets/proto/katakana/bin/index.bin') as number
  },
  'anime-ids': {
    proto: () => require('@assets/proto/anime-ids/proto/index.proto') as number,
    bin: () => require('@assets/proto/anime-ids/bin/index.bin') as number
  },
  nsfw: {
    proto: () => require('@assets/proto/nsfw/proto/index.proto') as number,
    bin: () => require('@assets/proto/nsfw/bin/index.bin') as number
  },
  mono: {
    proto: () => require('@assets/proto/mono/proto/index.proto') as number,
    bin: () => require('@assets/proto/mono/bin/index.bin') as number
  }
}

/** 读取本地 .proto 文本 */
export async function loadProtoText(name: DataAssets): Promise<string> {
  try {
    const asset = Asset.fromModule(MODULES[name].proto())

    if (!asset.localUri) await asset.downloadAsync()
    const response = await fetch(asset.localUri)
    return response.text()
  } catch (error) {
    logger.log(TAG, 'loadProtoText', 'Error loading proto file', { name })
    return ''
  }
}

/** 读取本地 .bin 字节 */
export async function loadBinBytes(name: DataAssets): Promise<Uint8Array> {
  try {
    const asset = Asset.fromModule(MODULES[name].bin())

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
