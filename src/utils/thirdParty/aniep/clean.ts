/*
 * @Author: czy0729
 * @Date: 2026-09-20 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:45
 *
 * 文件名常见标记清洗链, 供 aniep 与 ja.cleaned 复用
 */

/**
 * 移除文件名中的常见标记 (自研, 逐行对齐上游 soruly/aniep@0.6.0)
 * @doc https://github.com/soruly/aniep/blob/master/src/index.js#L3
 */
export function cleanFilename(filename: string): string {
  return (
    filename
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
      // 上游 quirk: 这两条无 i 标记, ja.cleaned 传入前已 lowercase, 故只在 aniep 路径可能命中
      .replace(/\(BD\)/, '') // remove resolution like (BD)
      .replace(/\(DVD\)/, '')
  ) // remove format like (DVD)
}
