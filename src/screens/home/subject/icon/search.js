/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-25 11:32:40
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconSearch(props, { $ }) {
  if ($.isLimit || $.hd) return null

  return (
    <Popover
      style={styles.touch}
      data={$.onlineComicOrigins}
      onSelect={$.onlineComicSelected}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-search' size={18} />
        <Text style={_.ml.xs} size={13} type='sub'>
          源头
        </Text>
      </Flex>
    </Popover>
  )
}

export default obc(IconSearch)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})

// function IconSearch(props, { $, navigation }) {
//   if ($.isLimit || $.hd) {
//     return null
//   }

//   return (
//     <Touchable
//       style={styles.icon}
//       onPress={() => {
//         t('条目.跳转', {
//           from: '源头',
//           subjectId: $.subjectId
//         })

//         navigation.push('Comic', {
//           cn: $.cn,
//           jp: $.jp,
//           subjectId: $.subjectId
//         })
//       }}
//     >
//       <Flex>
//         <Iconfont name='md-search' />
//         <Text style={_.ml.xs} size={13} type='sub'>
//           源头
//         </Text>
//       </Flex>
//       <Heatmap
//         id='条目.跳转'
//         data={{
//           from: '源头'
//         }}
//       />
//     </Touchable>
//   )
// }
