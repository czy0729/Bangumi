/*
 * @Author: czy0729
 * @Date: 2024-03-25 20:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 00:38:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BgmText, Text } from '@components'
import { _ } from '@stores'
import { TEXT_SECTION_INDENT } from '@constants'
import { FONT_BASE, FONT_MAIN, FONT_STRONG } from '../../ds'

function Section2() {
  return (
    <>
      <Text style={_.mt.md} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}客户端内并没有直接播放视频的功能，请你先知悉客户端是用来干什么的！
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}如果你觉得这个项目对你有帮助，
        <Text {...FONT_MAIN}>可以通过下方方式支持项目发展并留言 / 告知用户 id</Text>
        ，作者看见会第一时间为您开放额外权益。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        目前定义为：通常只有主站 <Text {...FONT_STRONG}>没有的功能</Text> 或者{' '}
        <Text {...FONT_STRONG}>无法直接获取的关联信息</Text>{' '}
        才会有所区分。普通用户也能使用，只是在使用频率上有所限制，以保障服务稳定运行。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        作为第三方客户端，部分功能可能会随主站政策调整而变化，还请理解
        <BgmText index={40} {...FONT_BASE} />。
      </Text>
    </>
  )
}

export default observer(Section2)
