/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:49:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:36:26
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, TEXT_UPDATE_TYPERANK } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <HeaderV2
      title={`分类排行 · ${MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.type)} · ${$.tag} (${
        $.state.ids.length
      })`}
      hm={HM}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Information', {
              title: '分类排行',
              message: [
                '此功能目前仅存在于客户端\n',
                '简单来说，这个标签排行榜的生成过程是这样的：',
                '1. 数据来源：收集全站所有带排名的条目（动画/书/游戏/音乐等）',
                '2. 时间快照：在某个特定时间点，对这些条目进行"拍照"记录',
                '3. 标签筛选：找出这些条目使用的热门标签',
                '4. 精选TOP100：只选取排名最高的前100个条目',
                '5. 最终榜单：统计这些精选条目的所有标签，生成排行榜',
                '6. 补充：因为全站的标签均为用户编辑导向的，故会出现不符合预期的情况，仅供参考\n',
                `最后一次快照时间为：${TEXT_UPDATE_TYPERANK}`
              ]
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
