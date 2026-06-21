/*
 * @Author: czy0729
 * @Date: 2024-03-25 23:32:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:35:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { FONT_BASE } from '../../ds'

function Section3() {
  return (
    <>
      <Text style={_.mt.md} size={16} bold align='center'>
        支持者的额外权益
      </Text>
      <Text style={_.mt.md} {...FONT_BASE}>
        　客户端：完整使用多达百个功能 / 页面
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        条目封面：备用图片源（需支持过项目发展）
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        需求反馈：优先跟进
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　　进度：支持最大显示 300 个在看条目
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　　条目：支持追踪多个用户吐槽点评、收看进度
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　时光机：条目吐槽能索引到更早的贴贴内容
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        用户空间：支持浏览用户历史帖子
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        关联系列：支持更多相关搜索
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　找条目：支持更多数据
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        哔哩同步：完整同步功能
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        豆瓣同步：完整同步功能
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        翻译功能：支持多个翻译源
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　小圣杯：通用玩法功能
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        　　还有很多不写了，罗列完整也并不会促使去尝试使用，该用到的时候自然会用到。其实绝大部分日常功能根本不会碰到这些限制。
      </Text>
    </>
  )
}

export default observer(Section3)
