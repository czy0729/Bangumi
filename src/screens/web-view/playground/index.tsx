/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-19 17:57:44
 */
import React from 'react'
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
// import { LinearGradient } from 'expo-linear-gradient'
import { useObserver } from 'mobx-react-lite'
import { Page, Header, Text } from '@components'
// import { _ } from '@stores'

// const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Playground = () => {
  return useObserver(() => (
    <>
      <Header title='Playground' />
      <Page>
        <Text>Playground</Text>
        {/* <ShimmerPlaceholder
          style={{
            borderRadius: 8,
            overflow: 'hidden'
          }}
          visible={false}
          shimmerColors={[
            _._colorDarkModeLevel1,
            _._colorDarkModeLevel2,
            _._colorDarkModeLevel1
          ]}
          duration={1600}
        >
          <Text>Wow, awesome here.</Text>
        </ShimmerPlaceholder> */}
      </Page>
    </>
  ))
}

export default Playground
