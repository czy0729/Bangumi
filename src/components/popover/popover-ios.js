/*
 * 气泡, 没有完全沿用官方的, 改了很多代码
 * @Doc: https://rn.mobile.ant.design/components/popover-cn/
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-27 08:15:57
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { HoldItem } from 'react-native-hold-menu'
import { Text } from '../text'
// import CompPopover from '../@/ant-design/popover'
// import { _ } from '@stores'

{
  /* <HoldItem
  items={[
    { text: 'Actions', isTitle: true, onPress: () => {} },
    { text: 'Action 1', onTap: () => {} },
    { text: 'Action 2', withSeparator: true, onPress: () => {} },
    { text: 'Action 3', isDestructive: true, onPress: () => {} }
  ]}
  activateOn='tap'
>
  <Flex
    style={{
      width: 80,
      height: 80
    }}
  >
    <Text>1</Text>
  </Flex>
</HoldItem> */
}

function Popover({ children, ...other }) {
  const { style, overlay } = other
  const { data = [], onSelect } = overlay.props
  const items = data.map(item => ({
    text: item,
    onPress: () => onSelect(item)
  }))
  return (
    <View style={style}>
      <HoldItem
        styles={{
          position: 'relative',
          maxWidth: '80%'
        }}
        items={items}
        activateOn='tap'
      >
        {children}
      </HoldItem>
    </View>
  )
}

// function Popover({ children, ...other }) {
//   return (
//     <CompPopover
//       arrowStyle={{
//         borderTopColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
//       }}
//       {...other}
//     >
//       {children}
//     </CompPopover>
//   )
// }

export default observer(Popover)
