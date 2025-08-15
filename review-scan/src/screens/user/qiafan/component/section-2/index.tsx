/*
 * @Author: czy0729
 * @Date: 2024-03-25 20:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-25 23:31:40
 */
import React from 'react'
import { BgmText, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { TEXT_SECTION_INDENT } from '@constants'
import { FONT_BASE, FONT_MAIN, FONT_STRONG } from '../../ds'

function Section2() {
  return (
    <>
      <Text style={_.mt.md} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}客户端内并没有直接播放视频的功能，请你先知悉客户端是用来干什么的！
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}补充说明一下何为
        <Text {...FONT_MAIN}>高级用户</Text>
        ，只要给予过打赏，
        <Text {...FONT_MAIN}>并且留言 / 告知用户 id</Text>
        。作者看见会第一时间把您加进高级用户组，可以无限制享受客户端内特有功能。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        目前定义为：通常只有源站<Text {...FONT_STRONG}>没有的功能</Text>
        或者<Text {...FONT_STRONG}>无法直接获取的关联信息</Text>
        才会成为高级功能，并且普通用户也能使用，只会在不影响使用的程度内进行限制，以避免滥用。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        为了能继续发展，部分功能可能会突然消失，懂的都懂，不懂的我也不好多说，这事牵扯太多
        <BgmText index={15} {...FONT_BASE} />。
      </Text>
    </>
  )
}

export default ob(Section2)
