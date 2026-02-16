/*
 * @Author: czy0729
 * @Date: 2025-05-12 16:11:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 17:45:04
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Text } from '@components'
import { _ } from '@stores'
import { open, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { DATA } from '../../ds'
import { startsWithNumberDot, startsWithNumberDotNumber } from '../../utils'
import { COMPONENT } from './ds'

function Scroll({ forwardRef, forwardItemRef }) {
  r(COMPONENT)

  return useObserver(() => (
    <TinygrailScrollView
      forwardRef={forwardRef}
      style={_.container.wind}
      contentContainerStyle={_.container.bottom}
    >
      {DATA.map(item => {
        const { title } = item
        return (
          <>
            <View
              key={title}
              style={_.mt.md}
              ref={ref => {
                forwardItemRef(ref, title)
              }}
            >
              <Text style={_.mb.md} size={24} lineHeight={28} bold selectable>
                {title}
              </Text>
            </View>
            {item.message.map((i: string, idx: number) => {
              const key = `${title}|${idx}`
              if (i.startsWith('url=')) {
                const str = i.split('url=')[1]
                const [name, url] = str.split(',')
                return (
                  <Text
                    key={key}
                    style={_.mv.sm}
                    size={16}
                    lineHeight={20}
                    selectable
                    underline
                    onPress={() => {
                      open(url)
                    }}
                  >
                    [{name}]
                  </Text>
                )
              }

              const isSubTitle = startsWithNumberDotNumber(i)
              const isTitle = isSubTitle ? false : startsWithNumberDot(i)
              let size = 15
              if (isSubTitle) {
                size += 2
              } else if (isTitle) {
                size += 4
              }

              return (
                <View
                  key={key}
                  ref={
                    isSubTitle || isTitle
                      ? ref => {
                          forwardItemRef(ref, i)
                        }
                      : undefined
                  }
                  style={stl(i && _.mb.sm, isTitle && _.mb.md)}
                >
                  <Text size={size} lineHeight={size + 4} bold={isTitle} selectable>
                    {i}
                  </Text>
                </View>
              )
            })}
            <Divider key={`${title}|divider`} style={_.mt.md} />
          </>
        )
      })}
    </TinygrailScrollView>
  ))
}

export default Scroll
