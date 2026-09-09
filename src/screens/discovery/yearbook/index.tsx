/*
 * @Author: czy0729
 * @Date: 2021-07-15 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:45:55
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page, ScrollView } from '@components'
import Award2022 from '../index/component/award/award-2022'
import Blocks from './component/blocks'
import Years from './component/years'
import Header from './header'
import { memoStyles } from './styles'

/** 年鉴 */
function Yearbook() {
  const styles = memoStyles()

  return (
    <Component id='screen-yearbook'>
      <Page>
        <HeaderPlaceholder />
        <ScrollView contentContainerStyle={styles.container} scrollToTop>
          <Award2022 width={styles.item2021.width} height={styles.item2021.height} />
          <Blocks />
          <Years />
        </ScrollView>
      </Page>
      <Header />
    </Component>
  )
}

export default observer(Yearbook)
