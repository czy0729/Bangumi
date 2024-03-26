/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-26 04:23:47
 */
import React from 'react'
import { Component, Divider, Header, ScrollView } from '@components'
import { _, userStore } from '@stores'
import { ob } from '@utils/decorators'
import Section1 from './component/section-1'
import Section2 from './component/section-2'
import Section3 from './component/section-3'
import Section4 from './component/section-4'

function Qiafan() {
  return (
    <Component id='screen-qiafan'>
      <Header title='关于客户端' hm={['qiafan', 'Qiafan']} />
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={[_.container.wind, _.container.bottom]}
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
    </Component>
  )
}

export default ob(Qiafan)
