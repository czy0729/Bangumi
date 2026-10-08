/*
 * @Author: czy0729
 * @Date: 2026-08-30 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 13:36:13
 *
 * 仅 native 端: bin 资源模块映射与本地加载 (metro asset + expo-asset)
 *  - bin 内容变更后必须重启 Metro 并重新加载 App: 资源 URL 按内容哈希生成, 旧包会 404
 */
import { Asset } from 'expo-asset'
import { toByteArray } from '@utils/thirdParty/base64'
import { logger } from '../../dev'
import { EncodingType, readAsStringAsync } from '../file-system'

import type { DataAssets } from './types'

const TAG = '@utils/thirdParty/protobuf/assets'

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
  'anime-ranks': () => require('@assets/proto/anime-ranks/bin/index.bin') as number,
  'book-ranks': () => require('@assets/proto/book-ranks/bin/index.bin') as number,
  'game-ranks': () => require('@assets/proto/game-ranks/bin/index.bin') as number,
  'music-ranks': () => require('@assets/proto/music-ranks/bin/index.bin') as number,
  'real-ranks': () => require('@assets/proto/real-ranks/bin/index.bin') as number,
  'book-ids': () => require('@assets/proto/book-ids/bin/index.bin') as number,
  'game-ids': () => require('@assets/proto/game-ids/bin/index.bin') as number,
  'music-ids': () => require('@assets/proto/music-ids/bin/index.bin') as number,
  'real-ids': () => require('@assets/proto/real-ids/bin/index.bin') as number,
  nsfw: () => require('@assets/proto/nsfw/bin/index.bin') as number,
  music: () => require('@assets/proto/music/bin/index.bin') as number,
  real: () => require('@assets/proto/real/bin/index.bin') as number,
  mono: () => require('@assets/proto/mono/bin/index.bin') as number,
  wenku: () => require('@assets/proto/wenku/bin/index.bin') as number,
  album: () => require('@assets/proto/album/bin/index.bin') as number
}

/** 读取本地 .bin 字节 */
export async function loadBinBytes(name: DataAssets): Promise<Uint8Array> {
  let asset: Asset | undefined
  try {
    asset = Asset.fromModule(MODULES[name]())

    if (!asset.localUri) await asset.downloadAsync()

    const base64String = await readAsStringAsync(asset.localUri, {
      encoding: EncodingType.Base64
    })
    return new Uint8Array(toByteArray(base64String))
  } catch (error) {
    logger.log(TAG, 'loadBinBytes', 'Error loading bin file', {
      name,
      uri: asset?.uri,
      localUri: asset?.localUri,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error)
    })
    return new Uint8Array()
  }
}
