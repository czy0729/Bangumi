/*
 * @Author: czy0729
 * @Date: 2026-09-02 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * 自研解码的 schema 表: 与 src/assets/proto/{name}/proto/index.proto 的条目 message 一一对应
 * 数据集一律为 message Payload { repeated XXX payload = 1; } 包装, 此处只描述条目本身
 */
import type { DataAssets } from './types'

/**
 * schema 条目描述
 *  - tag: 字段编号
 *  - key: 解码后的对象属性名, 与 .proto 字段名一致
 *  - type: int32[] 同时兼容 packed (wire type 2) 与 unpacked (wire type 0) 编码
 *  - schema: type 为 message / message[] 时的子 message schema
 */
export type FieldSpec = {
  /** 字段编号 */
  tag: number

  /** 对象属性名 */
  key: string

  /** 字段类型 */
  type: 'int32' | 'int64' | 'float' | 'string' | 'int32[]' | 'message' | 'message[]'

  /** 子 message schema */
  schema?: Schema
}

/** message schema: 字段编号 → 字段描述 */
export type Schema = Record<number, FieldSpec>

/** bangumi-data 条目的各站外链 */
const SITES: Schema = {
  1: { tag: 1, key: 'b', type: 'int64' },
  2: { tag: 2, key: 'bhmt', type: 'int64' },
  3: { tag: 3, key: 'mal', type: 'int64' },
  4: { tag: 4, key: 'adb', type: 'int64' }
}

/** 字典类数据集的键值对 ( ja / d ) */
const PAIR_INT: Schema = {
  1: { tag: 1, key: 'k', type: 'string' },
  2: { tag: 2, key: 'v', type: 'int32' }
}

/** 字典类数据集的键值对 ( katakana ) */
const PAIR_STRING: Schema = {
  1: { tag: 1, key: 'k', type: 'string' },
  2: { tag: 2, key: 'v', type: 'string' }
}

/** 年份/标签 → SubjectId[] 分组 ( anime-ids ) */
const GROUP: Schema = {
  1: { tag: 1, key: 'k', type: 'string' },
  2: { tag: 2, key: 'v', type: 'int32[]' }
}

/**
 * 数据集名 → 条目 schema
 *  - schema 变更时需同步修改对应 .proto 与生成管线 (web/test/pb.js)
 */
export const ITEM_SCHEMAS: Record<DataAssets, Schema> = {
  'bangumi-data': {
    1: { tag: 1, key: 'id', type: 'int64' },
    2: { tag: 2, key: 'j', type: 'string' },
    3: { tag: 3, key: 'c', type: 'string' },
    4: { tag: 4, key: 't', type: 'string' },
    5: { tag: 5, key: 's', type: 'message', schema: SITES }
  },
  anime: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 's', type: 'float' },
    3: { tag: 3, key: 'r', type: 'int32' },
    4: { tag: 4, key: 'l', type: 'int32' },
    5: { tag: 5, key: 'st', type: 'int32' },
    6: { tag: 6, key: 'ty', type: 'string' },
    7: { tag: 7, key: 'o', type: 'int32[]' },
    8: { tag: 8, key: 't', type: 'int32[]' },
    9: { tag: 9, key: 'ar', type: 'string' },
    10: { tag: 10, key: 'b', type: 'string' }
  },
  manga: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 's', type: 'float' },
    3: { tag: 3, key: 'r', type: 'int32' },
    4: { tag: 4, key: 'l', type: 'int32' },
    5: { tag: 5, key: 'u', type: 'int32' },
    6: { tag: 6, key: 'b', type: 'int32[]' },
    7: { tag: 7, key: 'e', type: 'string' },
    8: { tag: 8, key: 'p', type: 'string' },
    9: { tag: 9, key: 'd', type: 'string' },
    10: { tag: 10, key: 'h', type: 'int32' },
    11: { tag: 11, key: 'a', type: 'int32' }
  },
  game: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 'f', type: 'string' },
    3: { tag: 3, key: 'en', type: 'string' },
    4: { tag: 4, key: 's', type: 'float' },
    5: { tag: 5, key: 'r', type: 'int32' },
    6: { tag: 6, key: 'l', type: 'int32' },
    7: { tag: 7, key: 'ta', type: 'int32[]' },
    8: { tag: 8, key: 'd', type: 'int32[]' },
    9: { tag: 9, key: 'p', type: 'int32[]' },
    10: { tag: 10, key: 'pl', type: 'int32[]' },
    11: { tag: 11, key: 'vs', type: 'float' },
    12: { tag: 12, key: 'vc', type: 'int32' }
  },
  adv: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 'f', type: 'string' },
    3: { tag: 3, key: 'en', type: 'string' },
    4: { tag: 4, key: 's', type: 'float' },
    5: { tag: 5, key: 'r', type: 'int32' },
    6: { tag: 6, key: 'l', type: 'int32' },
    7: { tag: 7, key: 'd', type: 'int32' },
    8: { tag: 8, key: 't', type: 'int32' },
    9: { tag: 9, key: 'cn', type: 'int32' }
  },
  catalog: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 'd', type: 'string' },
    3: { tag: 3, key: 'l', type: 'string' },
    4: { tag: 4, key: 't', type: 'string' },
    5: { tag: 5, key: 'a', type: 'int32' },
    6: { tag: 6, key: 'b', type: 'int32' },
    7: { tag: 7, key: 'm', type: 'int32' },
    8: { tag: 8, key: 'g', type: 'int32' },
    9: { tag: 9, key: 'r', type: 'int32' },
    10: { tag: 10, key: 'ch', type: 'int32' },
    11: { tag: 11, key: 'pe', type: 'int32' },
    12: { tag: 12, key: 'to', type: 'int32' },
    13: { tag: 13, key: 'bl', type: 'int32' },
    14: { tag: 14, key: 'ep', type: 'int32' }
  },
  ja: PAIR_INT,
  d: PAIR_INT,
  katakana: PAIR_STRING,
  'anime-ids': GROUP,
  nsfw: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 'd', type: 'string' },
    3: { tag: 3, key: 's', type: 'float' },
    4: { tag: 4, key: 'r', type: 'int32' },
    5: { tag: 5, key: 'l', type: 'int32' },
    6: { tag: 6, key: 'c', type: 'int32' },
    7: { tag: 7, key: 't', type: 'int32' },
    8: { tag: 8, key: 'e', type: 'int32' }
  },
  mono: {
    1: { tag: 1, key: 'i', type: 'int32' },
    2: { tag: 2, key: 'n', type: 'string' },
    3: { tag: 3, key: 'c', type: 'string' },
    4: { tag: 4, key: 'r', type: 'int32' },
    5: { tag: 5, key: 'p', type: 'int32' }
  }
}
