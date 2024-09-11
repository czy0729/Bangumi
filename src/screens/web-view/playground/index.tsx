/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:17:40
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Button, Component, Header, Page } from '@components'
import { _ } from '@stores'
import { get, update } from '@utils/kv'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title='Playground' />
      <Page>
        <View style={_.container.outer}>
          <Button
            style={_.mb.md}
            onPress={() => {
              update('advance', {
                magma: 'a|30'
              })
            }}
          >
            update
          </Button>
          <Button
            style={_.mb.md}
            onPress={async () => {
              console.info(await get('advance'))
            }}
          >
            get
          </Button>
          <Button
            style={_.mb.md}
            onPress={() => {
              update('bgs', {
                data: [
                  'https://i0.hdslb.com/bfs/article/0c7233206db43b00e19c781d3f3f59dc49143463.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/7cf2b32b4e0b2d619b67a34a8da73ac9358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/f1891c0a66ab7405a369bfdfeac1924f358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/551784b7f6bdaac2f3492028bc5c70f1358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/889671593ca0c88365ae45cbe8e59df9358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/48934877d34b319c6d9e647fb38efc01358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/6fa64572b09958d86f8d6e4d94455ebb358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/4172c3893c56aabc86773e46eb5d913d358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/01426f256f28d235c98df2b8659e4102358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/292ebbe3099c711d20b7041ed09b5032507431146.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/af380abc4c9e9a1b316af39462e286e925830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/e0489f89e9b9dd96643115474db3ec9525830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/e6633c8e0d9c9588d06b421189c3b90a25830969.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/37d780da9974e25160cb4601216478ab25830969.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/b5ccc5fd06196b9edf05d8f87fc4565c25830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/0d839666e36656d213b63f0fcee424e125830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/354247a086e0d4c9fd5f3d6c5948139f25830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/ffcf5285957aa52050ed43fb5caa686725830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/8be84355ce7f2ec16a8b64e53aeb2db525830969.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/5fd57a5d1873dba572db84e841ee9a5c25830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/24779fd7a191e44070616ff4cfb96c5a25830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/af380abc4c9e9a1b316af39462e286e925830969.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/557693ede3a8e38256320dbe69f4191a358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/4f44c49f17ab96cf52ddfbdd38d7f73f358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/d4313aef978886e7dbc1ec1c348eb47a358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/6911f063b851ba98195f5e5ed9dab38b358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/bd9c59cb8da8f60f47acbf8f7ade6777358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/23b6435e006cc45cede4e9e109e3fb88358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/a027463b2b9cc96fab985eabab44b01c358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/272edfbbf7b0ccad6b3e39105b432299358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/36c4eaad7bcf85a5d79141ed634be768358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/27a8e82fc0a99afbbfefff77e1d5f156358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/915a9df96c321b178a593d499671c498358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/dfaafd8ef9a71a9edc440d7055bfbba7358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/e5ed02b4ead5cc6afb7052772b468be9358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/4ea31ac69f8bb6b1491dc47590cb873a358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/new_dyn/fb7a44cdce6aa482444eba6ddc63047f358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/84b00df6862e2051f61945296cb56727358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/9930d02cb254d8c43ecf3fd5baa0dca4358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/290723afae9741d39f8ea43ebf68c4ef358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/09ee7acd0fcceb17f257a1e1af97a221358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/a25226ecaa0464df81aa6d3b44df8082358972.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/65b32cf6de5ac0f07a4aec3539ff5bb7e3b093b0.gif',
                  'https://i0.hdslb.com/bfs/article/dfe0c56f33f338f2a335fdc8fa22f4f1c1ea9964.gif',
                  'https://i0.hdslb.com/bfs/article/e033391721f47039260e65102e32f4de46c7d05f.gif',
                  'https://i0.hdslb.com/bfs/article/8c3429e148dc344a8780980698fc3eca991be861.gif',
                  'https://i0.hdslb.com/bfs/article/20a09b45aae1517c6b7bd18eb2b707e3a998be87.gif',
                  'https://i0.hdslb.com/bfs/article/7556ba71402de36e231c44f98414df3c6a4bd8f1.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/cb9f66d1f38c9396852b833dd7a372da15148426.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/050e33203e6fe5894cbe2a82fb03fde5d688f711.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/6981d9ef891f7e97608c25a5681b07b00bf1b204.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/332ad573ab8474d9180238974a1c38917343e86e.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/842c0e58c78a848c15a327fbcef53796aec9fae6.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/c85a0be67ef1dfc430a5a1431b0d519d569a3d24.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/a03aa380f5a3659d84ed690fe8d8a637a5b5df30.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/bea0c22e9358d6bcaa32598ac41e088898805ac3.png@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/391fbd2f09cf8fc82a848efd3548ce57a5c815dc.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/1f5104a4928f92944d76c084c3b9c1d0a80e0731.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/9092893570ab09559c65556b52491832e5b55b48.jpg@progressive.webp',
                  'https://i0.hdslb.com/bfs/article/b13290ea3bbddffc04f95d0a2842044ba64f671d.jpg@progressive.webp',
                  'https://s3.bmp.ovh/imgs/2022/03/cfd262b8d2c2858a.png',
                  'https://tinygrail.mange.cn/senken/tinygrail_wallpaper.png!w640',
                  'http://bgm.tv/pic/wallpaper/01.png'
                ]
              })
            }}
          >
            bgs
          </Button>
        </View>
      </Page>
    </Component>
  ))
}

export default Playground
