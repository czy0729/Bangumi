/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:26:44
 */
import React from 'react'
import { Page, Flex } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Category from './category'
import Legacy from './legacy'
import SearchBar from './search-bar'
import BtnSubmit from './btn-submit'
import Advance from './advance'
import History from './history'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Search = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { cat, value } = $.state
    return (
      <>
        <Header />
        <Page>
          <Flex style={styles.searchBar}>
            <Category />
            <Flex.Item>
              <SearchBar />
            </Flex.Item>
            <Legacy />
            <BtnSubmit />
          </Flex>
          {$.showAdvance && (
            <Advance
              navigation={navigation}
              cat={cat}
              value={value}
              onSubmit={(text: string) => $.onAdvance(text, navigation)}
            />
          )}
          <History />
          <List />
        </Page>
      </>
    )
  })
}

export default ic(Store, Search)

const styles = _.create({
  searchBar: {
    marginTop: _.xs,
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  }
})
