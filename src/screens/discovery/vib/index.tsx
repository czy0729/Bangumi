/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:42:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-13 07:20:29
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { InView, TapListener } from '@_'
import { _, StoreContext, uiStore } from '@stores'
import { NavigationProps, ScrollEvent } from '@types'
import BlockNew from './component/block-new'
import BlockTrend from './component/block-trend'
import Pagination from './component/pagination'
import Title from './component/title'
import Header from './header'
import { useVIBPage } from './hooks'
import { memoStyles } from './styles'

/** 评分月刊 */
const VIB = (props: NavigationProps) => {
  const { id, $, navigation, data, index, loaded, scrollTo, handleSelect } = useVIBPage(props)

  const current = data[index]
  const handleForwardRef = useCallback((fn: any) => (scrollTo.current = fn), [scrollTo])
  const handleScroll = useCallback(
    (event: ScrollEvent) => {
      $.onScroll(event)
      uiStore.closePopableSubject()
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-vib'>
        <StoreContext.Provider value={id}>
          <TapListener>
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
          </TapListener>
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
