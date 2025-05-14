/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-15 07:24:29
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Drawer, ScrollView, Text, Touchable } from '@components'
import { open, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { DATA } from '../../ds'
import { startsWithNumberDot, startsWithNumberDotNumber, startsWithURL } from '../../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Menu({ show, onToggle, onScrollTo }) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Drawer
        style={styles.drawer}
        show={show}
        onToggle={() => {
          onToggle(false)
        }}
      >
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {DATA.map((item, index) => {
            return (
              <View key={item.title}>
                {!!index && <Divider />}
                <Touchable
                  style={styles.item}
                  onPress={() => {
                    onScrollTo(item.title)
                  }}
                >
                  <Text size={16}>{item.title}</Text>
                </Touchable>
                {item.message
                  .filter(
                    i => startsWithNumberDotNumber(i) || startsWithNumberDot(i) || startsWithURL(i)
                  )
                  .map((i, idx) => {
                    const isURL = startsWithURL(i)
                    if (isURL) {
                      const str = i.split('url=')[1]
                      const [name, url] = str.split(',')
                      return (
                        <Touchable
                          key={idx}
                          style={styles.sub}
                          onPress={() => {
                            open(url)
                          }}
                        >
                          <Text size={15} underline>
                            [{name}]
                          </Text>
                        </Touchable>
                      )
                    }

                    const isSubTitle = isURL ? false : startsWithNumberDotNumber(i)
                    const isTitle = isURL || isSubTitle ? false : startsWithNumberDot(i)
                    return (
                      <Touchable
                        key={idx}
                        style={stl(isTitle && styles.title, isSubTitle && styles.sub)}
                        onPress={() => {
                          onScrollTo(i)
                        }}
                      >
                        <Text size={15}>{i}</Text>
                      </Touchable>
                    )
                  })}
              </View>
            )
          })}
        </ScrollView>
      </Drawer>
    )
  })
}

export default Menu
