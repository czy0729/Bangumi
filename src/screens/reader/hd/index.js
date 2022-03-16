/*
 * @Author: czy0729
 * @Date: 2021-01-16 00:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:22:34
 */
import React from 'react'
import { View } from 'react-native'
import { Page, ScrollView, Text, Flex } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { CDN_HD_OBJECT } from '@constants/cdn'
import Header from './header'
import Store from './store'

const num = 3

const HD = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    const gridStyles = _.grid(num)
    return (
      <>
        <Header />
        <Page>
          <ScrollView contentContainerStyle={styles.contentContainerStyle} scrollToTop>
            <Flex wrap='wrap'>
              {$.state.data.map((item, index) => (
                <View
                  key={item.vol}
                  style={[styles.item, _.isPad && !(index % num) && _.container.left]}
                >
                  <Cover
                    size={gridStyles.width}
                    height={gridStyles.height}
                    src={CDN_HD_OBJECT($.subjectId, item.vol)}
                    radius
                    shadow
                    onPress={() => $.jump(item)}
                  />
                  <Text style={_.mt.sm} align='center' bold>
                    {typeof item.vol === 'number' && 'vol.'}
                    {item.vol}
                    <Text size={10} lineHeight={14} type='sub'>
                      {' '}
                      {item.page}P
                    </Text>
                  </Text>
                </View>
              ))}
            </Flex>
          </ScrollView>
        </Page>
      </>
    )
  })
}

export default ic(Store, HD)

const memoStyles = _.memoStyles(() => {
  const gridStyles = _.grid(num)
  return {
    contentContainerStyle: {
      paddingBottom: _.bottom
    },
    item: {
      width: gridStyles.width,
      marginBottom: gridStyles.marginLeft,
      marginLeft: gridStyles.marginLeft
    }
  }
})
