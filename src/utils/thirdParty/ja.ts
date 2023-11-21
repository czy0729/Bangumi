/*
 * @Author: czy0729
 * @Date: 2023-11-20 16:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-21 16:59:04
 */
import jdData from '@assets/json/thirdParty/ja.min.json'
import jdDataAddon from '@assets/json/thirdParty/ja.addon.json'
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'

const CACHE_MAP = new Map<string, number>()

const REPLACEMENTS = {
  1: 'i',
  2: 'ii',
  3: 'iii',
  4: 'iv',
  5: 'v',
  6: 'vi',
  7: 'vii',
  8: 'viii',
  9: 'ix',
  10: 'x'
} as const

/** 尝试查找罗马音 */
export function findJA(input: string) {
  if (CACHE_MAP.has(input)) return CACHE_MAP.get(input)

  const input1 = cleaned(input)
  let subjectId = jdData[input1] || jdDataAddon[input1]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  const input2 = cleaned2(input)
  subjectId = jdData[input2] || jdDataAddon[input2]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  const input3 = cleaned3(input)
  subjectId = jdData[input3] || jdDataAddon[input3]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  // 在 bangumi-data 中找
  if (input1 || input2 || input3) {
    const find = bangumiData.find(item => {
      const c = (item.c || '').toLowerCase().replace(/ |劇場版|剧场版|·/g, '')
      const j = (item.j || '').toLowerCase().replace(/ |劇場版|剧场版|·/g, '')

      const _input1 = input1.replace(/ |劇場版|剧场版|·/g, '')
      let result = _input1 && (_input1 === c || _input1 === j)
      if (result) return result

      result = input2 && (input2 === c || input2 === j)
      if (result) return result

      result = input3 && (input3 === c || input3 === j)
      return result
    })
    if (find) {
      CACHE_MAP.set(input, find.id)
      return find.id
    }
  }

  let input4 = cleaned4(input)
  subjectId = jdData[input4] || jdDataAddon[input4]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  if (/(\d)$/.test(input4)) {
    input4 = input4.replace(/(\d)$/g, (match, number) => REPLACEMENTS[number] || match)
    subjectId = jdData[input4] || jdDataAddon[input4]
    if (subjectId) {
      CACHE_MAP.set(input, subjectId)
      return subjectId
    }
  }

  const input5 = cleaned5(input)
  subjectId = jdData[input5] || jdDataAddon[input5]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  const input6 = cleaned6(input)
  subjectId = jdData[input6] || jdDataAddon[input6]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  const input7 = cleaned7(input)
  subjectId = jdData[input7] || jdDataAddon[input7]
  if (subjectId) {
    CACHE_MAP.set(input, subjectId)
    return subjectId
  }

  CACHE_MAP.set(input, 0)
}

/** 移除各种常见特殊符号 */
export function cleaned(input: string) {
  return (
    input
      .toLowerCase()

      /** https://github.com/soruly/aniep/blob/master/src/index.js#L3 */
      .replace(/[\r\n]$/, '') // remove extra newlines from end of string
      .replace(/((?:\.mp4|\.mkv)+)$/, '') // remove file extension
      .replace(/(v\d)$/i, '') // remove v2, v3 suffix
      .replace(/(\d)v[0-5]/i, '$1') // remove v2 from 13v2
      .replace(/(x|h)26(4|5)/i, '') // remove x264 and x265
      .replace(/\bmp4\b/i, ' ') // remove x264 and x265
      .replace(/(8|10)-?bit/i, '') // remove 10bit and 10-bit
      .replace(/(\[[0-9a-fA-F]{6,8}])/, '[]') // remove checksum like [c3cafe11]
      .replace(/(\[\d{5,}])/, '') // remove dates like [20190301]
      .replace(/\d\d\d\d-\d\d-\d\d/, ' ') // remove dates like yyyy-mm-dd
      .replace(/\d{3,4}\s*(?:x|×)\s*\d{3,4}p?/i, ' ') // remove resolutions like 1280x720
      .replace(/(?:2160|1080|720|480)(?:p|i)/i, ' ') // remove resolutions like 720p or 1080i
      .replace(/(?:3840|1920|1280)[-_](?:2160|1080|720)/, ' ') // remove resolutions like 1280x720
      .replace(/2k|4k/i, ' ') // remove resolutions 2k or 4k
      .replace(/((19|20)\d\d)/, '') // remove years like 1999 or 2019
      .replace(/\(BD\)/, '') // remove resolution like (BD)
      .replace(/\(DVD\)/, '') // remove format like (DVD)

      /** 自己的 */
      .replace(
        /(^\d+\.)|\+sp|mp4|mkv|bdrip|hevc|aac|ac3|x[1-9]|简(体|日)|繁(体|日)|外挂|压制|1$|s1$|\[(bd|dvd|bd&dvd|sub|gb|gb_jp)\]/gi,
        ''
      ) // 常见 tag
      .replace(/\d+-\d+/g, '') // 1-26
      .replace(/ |-|!|！|\?|？|,|，|~|・|\.|。|:|：|&|\[|\]|\/|;|\^|`|'|"|\+|_/g, '') // 特殊符号
      .trim()
  )
}

/**
 * 只保留罗马音
 *  - '化物语 Bakemonogatari' => 'Bakemonogatari'
 * */
export function cleaned2(input: string) {
  return cleaned(input.replace(/[^a-zA-Z]/g, ''))
}

/**
 * 中文后面紧跟着的英文也移除
 *  - '魔装学园H×H Masou Gakuen HxH' => 'Masou Gakuen HxH'
 *  - 'Re：从零开始的异世界生活 Re：Zero Kara Hajimeru Isekai Seikatsu' => 'Re：Zero Kara Hajimeru Isekai Seikatsu'
 * */
export function cleaned3(input: string) {
  const paragraphs = input.split(' ')
  const filteredParagraphs = paragraphs.filter(
    paragraph => !/[\u4e00-\u9fa5]/.test(paragraph)
  )
  return cleaned(filteredParagraphs.join(' '))
}

const specReg =
  /^eiga|gekijouban|(the)?animation|(the|movies?|extras?|specials?|tv|sp)$/g

/**
 * 匹配条目名也被括号包起来的情况
 *  - 'Yahari Ore [BD 1920x1080 HEVC-10bit OPUS]S2' => 'yahariore2'
 * */
export function cleaned4(input: string) {
  return cleaned3(removeFirstBracketContent(input))
    .replace(
      /s1|movies?|extras?|specials?|ova|oad|chs|cht|jap|chinese|subbed|series|bdbox|opus|bd/g,
      ''
    )
    .replace(specReg, '')
    .replace(/s(\d+)$/, '$1') // 匹配以s开头，后面跟着数字的部分，并保留数字部分
}

/**
 * 匹配条目名也被括号包起来的情况 2
 *  - '[SUB][轻音少女 K-ON!][S1+S2+MOVIE+OVA+SP][BDRIP][720P][X264-10bit_AACx3]' => 'kon'
 * */
export function cleaned5(input: string) {
  return cleaned3(removeFirstBracketContent(input))
    .replace(
      /s[1-9]|movies?|extras?|specials?|ova|oad|chs|cht|jap|chinese|subbed|series|bdbox|opus|bd/g,
      ''
    )
    .replace(specReg, '')
}

/**
 * 尝试特殊情况, 'wo' => 'o'
 *  - 'Kono Subarashii Sekai ni Shukufuku wo! Kurenai Densetsu' => 'konosubarashiisekainishukufukuokurenaidensetsu
 */
export function cleaned6(input: string) {
  return cleaned4(input).replace(/wo/g, 'o')
}

/**
 * 尝试特殊情况, 'tsu' => 'zu'
 *  - 'kubikiricycleaoirosavanttozaregototsukai' => 'kubikiricycleaoirosavanttozaregotozukai'
 */
export function cleaned7(input: string) {
  return cleaned4(input).replace(/tsu/g, 'zu')
}

/** 去除第一个中括号内容, 通常都会是字幕组 */
function removeFirstBracketContent(input: string) {
  return input.replace(/^\[[^\]]*\]/, '').trim()
}
