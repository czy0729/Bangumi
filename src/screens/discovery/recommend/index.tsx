/*
 * @Author: czy0729
 * @Date: 2023-05-24 10:28:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-13 18:51:55
 */
import React from 'react'
import { View } from 'react-native'
import { Page, Header, Flex, Button } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import Category from './category'
import SearchBar from './search-bar'
import List from './list'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

const Recommend = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Header
          title='AI 推荐'
          hm={['recommend', 'Recommend']}
          headerRight={() => {
            if (STORYBOOK) return null

            return (
              <IconTouchable
                name='md-info-outline'
                color={_.colorDesc}
                onPress={() => {
                  navigation.push('Topic', {
                    topicId: 'group/382655'
                  })
                }}
              />
            )
          }}
        />
        <Page>
          <Flex style={styles.searchBar}>
            <Category />
            <Flex.Item>
              <SearchBar />
            </Flex.Item>
            <View style={_.ml.sm}>
              <Button
                style={styles.btn}
                type='ghostPlain'
                size='sm'
                onPress={$.doSearchV2}
              >
                查询
              </Button>
            </View>
          </Flex>
          <List />
        </Page>
        {STORYBOOK && (
          <View style={styles.home}>
            <IconTouchable
              name='home'
              size={17}
              color={_.colorSub}
              onPress={() => navigation.push('Discovery')}
            />
          </View>
        )}
      </>
    )
  })
}

export default ic(Store, Recommend)
