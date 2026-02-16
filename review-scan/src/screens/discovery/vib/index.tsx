/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:42:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 06:41:58
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { InView } from '@_'
import { _, StoreContext } from '@stores'
import { NavigationProps } from '@types'
import BlockNew from './component/block-new'
import BlockTrend from './component/block-trend'
import Pagination from './component/pagination'
import Title from './component/title'
import Header from './header'
import { useVIBPage } from './hooks'
import { memoStyles } from './styles'

/** 评分月刊 */
const VIB = (props: NavigationProps) => {
  const { id, navigation, data, index, loaded, handleSelect, handleForwardRef, handleScroll } =
    useVIBPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    const current = data[index]
    return (
      <Component id='screen-vib'>
        <StoreContext.Provider value={id}>
          <Page loaded={loaded}>
            <ScrollView
              forwardRef={handleForwardRef}
              contentContainerStyle={styles.contentContainerStyle}
              onScroll={handleScroll}
            >
              <Title
                text={`${current.title} (${current.desc})`.replace('日到', '至')}
                size='primary'
              />
              {current.data.map((item, index) => {
                const Component = index ? BlockTrend : BlockNew
                return (
                  <InView key={item.title} style={_.mt.lg} y={_.window.height * (index + 1)}>
                    <Component navigation={navigation} title={item.title} data={item.data} />
                  </InView>
                )
              })}
              <Pagination data={data} index={index} onSelect={handleSelect} />
            </ScrollView>
          </Page>
          <Header
            navigation={navigation}
            data={data.map(item => item.title)}
            onSelect={handleSelect}
          />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default VIB
