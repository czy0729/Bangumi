/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-12 15:46:39
 */
import React from 'react'
import { View } from 'react-native'
import { Header, Page, ScrollView, Divider } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Cloud from './cloud'
import Title from './title'
import Item from './item'
import Create from './create'
import Store, { types } from './store'

const OriginSetting = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Header title='自定义源头' hm={['origin-setting', 'OriginSetting']} />
        <Page>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Cloud onDownloaded={$.init} />
            {types.map((item, index) => (
              <View key={item.type}>
                {!!index && <Divider />}
                <Title type={item.type} name={item.name} />
                <View style={styles.list}>
                  {$.data[item.type].map((i, idx) => (
                    <Item key={idx} {...i} type={item.type} />
                  ))}
                  <Create type={item.type} name={item.name} />
                </View>
              </View>
            ))}
          </ScrollView>
        </Page>
      </>
    )
  })
}

export default ic(Store, OriginSetting)

const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  list: {
    minHeight: 80,
    marginTop: _.md
  }
}))
