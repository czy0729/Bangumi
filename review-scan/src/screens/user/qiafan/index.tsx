/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:42:45
 */
import React from 'react'
import { Component, Divider, HeaderV2, ScrollView } from '@components'
import { _, userStore } from '@stores'
import { ob } from '@utils/decorators'
import Section1 from './component/section-1'
import Section2 from './component/section-2'
import Section3 from './component/section-3'
import Section4 from './component/section-4'
import { HM } from './ds'

/** 关于客户端 */
function Qiafan() {
  return (
    <Component id='screen-qiafan'>
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={[_.container.page, _.container.wind]}
      >
        <Section1 />
        {!userStore.isLimit && (
          <>
            <Divider style={_.mt.md} />
            <Section2 />
            <Divider style={_.mt.md} />
            <Section3 />
            <Divider style={_.mt.md} />
            <Section4 />
          </>
        )}
      </ScrollView>
      <HeaderV2 title='关于客户端' hm={HM} />
    </Component>
  )
}

export default ob(Qiafan)
