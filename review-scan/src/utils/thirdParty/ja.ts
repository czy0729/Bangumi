/*
 * @Author: czy0729
 * @Date: 2023-11-20 16:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 09:12:30
 */
import { get } from '@utils/protobuf'
import { getJSON } from '@assets/json'

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

const memo = new Map<string, number>()

let jaDataKeys: string[] = []

/** 尝试查找罗马音 */
export function findJA(input: string) {
  if (memo.has(input)) return memo.get(input)

  const jaData: Record<string, number> = getJSON('thirdParty/ja.min')
  const jaDataAddon: Record<string, number> = getJSON('thirdParty/ja.addon')

  const input1 = cleaned(input)
  let subjectId = jaData[input1] || jaDataAddon[input1]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input2 = cleaned2(input)
  subjectId = jaData[input2] || jaDataAddon[input2]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input3 = cleaned3(input)
  subjectId = jaData[input3] || jaDataAddon[input3]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  /**
   * 基于 input1 尝试只保留中文字
   *  - '[DBD-Raws][4K_HDR][天气之子][2160P][BDRip][HEVC-10bit][中日外挂][FLAC][MKV]'
   *    => 'dbdrawshdr天气之子中日flac' => '天气之子'
   * */
  const _input1 = input1.replace(/ |劇場版|剧场版|简|繁|·/g, '')
  const inputCn = _input1.replace(/[^\u4e00-\u9fa5]/g, '')
  subjectId = jaData[inputCn] || jaDataAddon[inputCn]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  // 在 bangumi-data 中找
  if (_input1 || input2 || input3 || inputCn) {
    const find = (get('bangumi-data') || []).find(item => {
      const c = (item.c || '').toLocaleLowerCase().replace(/ |劇場版|剧场版|·/g, '')
      const j = (item.j || '').toLocaleLowerCase().replace(/ |劇場版|剧场版|·/g, '')
      return (
        (_input1 && (_input1 === c || _input1 === j)) ||
        (input2 && (input2 === c || input2 === j)) ||
        (input3 && (input3 === c || input3 === j)) ||
        (inputCn && (inputCn === c || inputCn === j))
      )
    })

    if (find) {
      memo.set(input, find.id)
      return find.id
    }
  }

  let input4 = cleaned4(input)
  subjectId = jaData[input4] || jaDataAddon[input4]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  if (/(\d)$/.test(input4)) {
    input4 = input4.replace(/(\d)$/g, (match, number) => REPLACEMENTS[number] || match)
    subjectId = jaData[input4] || jaDataAddon[input4]
    if (subjectId) {
      memo.set(input, subjectId)
      return subjectId
    }
  }

  // 从 cleaned5 开始, 都是属于非常模糊的饱和尝试匹配
  const input5 = cleaned5(input)
  subjectId = jaData[input5] || jaDataAddon[input5]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input6 = cleaned6(input)
  subjectId = jaData[input6] || jaDataAddon[input6]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input7 = cleaned7(input)
  subjectId = jaData[input7] || jaDataAddon[input7]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input8 = cleaned8(input)
  subjectId = jaData[input8] || jaDataAddon[input8]
  if (subjectId) {
    memo.set(input, subjectId)
    return subjectId
  }

  const input9 = input2.replace(/s$/g, '')
  if (input9.length >= 8) {
    if (!jaDataKeys.length) {
      jaDataKeys = Object.keys(jaData).filter(
        item => item.length >= 8 && !/[\u4e00-\u9fa5]/.test(item)
      )
    }

    const find = jaDataKeys.find(item => item.includes(input9))
    if (find) {
      subjectId = jaData[find]
      if (subjectId) {
        memo.set(input, subjectId)
        return subjectId
      }
    }
  }

  if (input9.includes('the')) {
    const input10 = input9.replace(/the/g, '')
    if (input10.length >= 8) {
      const find = jaDataKeys.find(item => item.includes(input10))
      if (find) {
        subjectId = jaData[find]
        if (subjectId) {
          memo.set(input, subjectId)
          return subjectId
        }
      }
    }
  }

  memo.set(input, 0)
}

/**
 * 移除各种常见特殊符号
 * */
export function cleaned(input: string) {
  return (
    input
      .toLocaleLowerCase()

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
        /(^\d+\.)|\+sp|mp4|mkv|bdrip|avc|chs|hevc|flac|hdr|aac|ac3|x[1-9]|简(体|日)|繁(体|日)|中日|中英|日英|外挂|压制|全集|特典|映像|双语|1$|s1$|\[(bd|dvd|bd&dvd|sub|gb|gb_jp)\]/gi,
        ''
      ) // 常见 tag
      .replace(/\d+-\d+/g, '') // 1-26
      .replace(/ |-|!|！|\?|？|,|，|~|・|\.|。|:|：|&|\[|\]|\/|;|\^|`|'|"|\+|_/g, '') // 特殊符号
      .trim()
  )
}

/**
 * 只保留罗马音
 *  - '化物语 Bakemonogatari'
 *  → 'Bakemonogatari'
 * */
export function cleaned2(input: string) {
  return cleaned(input.replace(/[^a-zA-Z]/g, ''))
}

/**
 * 中文后面紧跟着的英文也移除
 *  - '魔装学园H×H Masou Gakuen HxH'
 *  → 'Masou Gakuen HxH'
 *  - 'Re：从零开始的异世界生活 Re：Zero Kara Hajimeru Isekai Seikatsu'
 *  → 'Re：Zero Kara Hajimeru Isekai Seikatsu'
 * */
export function cleaned3(input: string) {
  const paragraphs = input.split(' ')
  const filteredParagraphs = paragraphs.filter(paragraph => !/[\u4e00-\u9fa5]/.test(paragraph))
  return cleaned(filteredParagraphs.join(' '))
}

/**
 * 尝试忽视类似 S0X 字段
 *  - 'Peter Grill to Kenja no Jikan Super Extra S02'
 *  → 'petergrilltokenjanojikansuperextra'
 */
export function cleaned4(input: string) {
  return cleaned3(removeFirstBracketContent(input))
    .replace(/s1|movies?|specials?|ova|oad|chs|cht|jap|chinese|subbed|series|bdbox|opus|bd/g, '')
    .replace(/^eiga|gekijouban|(the)?animation|(the|movies?|specials?|tv|sp)$|s0?[1-9]$/g, '')
    .replace(/@/g, 'a')
}

const SPEC_REG = /^eiga|gekijouban|(the)?animation|(the|movies?|extras?|specials?|tv|sp)$/g

/**
 * 匹配条目名也被括号包起来的情况
 *  - 'Yahari Ore [BD 1920x1080 HEVC-10bit OPUS]S2'
 *  → 'yahariore2'
 * */
export function cleaned5(input: string) {
  return cleaned3(removeFirstBracketContent(input))
    .replace(
      /s1|movies?|extras?|specials?|ova|oad|chs|cht|jap|chinese|subbed|series|bdbox|opus|bd/g,
      ''
    )
    .replace(SPEC_REG, '')
    .replace(/@/g, 'a')
    .replace(/s(\d+)$/, '$1') // 匹配以s开头，后面跟着数字的部分，并保留数字部分
}

/**
 * 匹配条目名也被括号包起来的情况 2
 *  - '[SUB][轻音少女 K-ON!][S1+S2+MOVIE+OVA+SP][BDRIP][720P][X264-10bit_AACx3]'
 *  → 'kon'
 * */
export function cleaned6(input: string) {
  return cleaned3(removeFirstBracketContent(input))
    .replace(
      /s0?[0-9]|movies?|extras?|specials?|ova|oad|chs|cht|jap|chinese|subbed|series|bdbox|opus|bd/g,
      ''
    )
    .replace(SPEC_REG, '')
    .replace(/@/g, 'a')
}

/**
 * 尝试特殊情况, 'wo' => 'o'
 *  - 'konosubarashiisekainishukufuku[wo]kurenaidensetsu'
 *  → 'konosubarashiisekainishukufuku[o]kurenaidensetsu
 */
export function cleaned7(input: string) {
  return cleaned5(input).replace(/wo/g, 'o')
}

/**
 * 尝试特殊情况, 'tsu' => 'zu'
 *  - 'kubikiricycleaoirosavanttozaregoto[tsu]kai'
 *  → 'kubikiricycleaoirosavanttozaregoto[zu]kai'
 */
export function cleaned8(input: string) {
  return cleaned5(input).replace(/tsu/g, 'zu')
}

/**
 * 最终情况, 只有这种情况是以少推多的
 * 若罗马音大于 8 位, 且包含于现有的 Object.keys(jaData) 中
 *  - '[inuninattaras]'
 *  → '[inuninattaras]ukinahitonihirowareta'
 */
export function cleaned9(input: string) {
  return cleaned2(input)
}

/** 去除第一个中括号内容, 通常都会是字幕组 */
function removeFirstBracketContent(input: string) {
  return input.replace(/^\[[^\]]*\]/, '').trim()
}
