/*
 * @Author: czy0729
 * @Date: 2023-02-25 17:52:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-26 03:31:54
 */
import { WebHooksUsersCollections } from '../src/utils/webhooks/types'

type Test<T extends (...args: any) => any> = {
  type: Parameters<T>[0]
  data: Parameters<T>[1]
}

/** [收藏] 修改用户单个收藏 */
export const usersCollections: Test<WebHooksUsersCollections> = {
  type: 'users_collections',
  data: {
    type: 3,
    rate: 0,
    comment: '',
    private: false,
    tags: ['2023年1月', '异世界', '漫画改', 'C2C'],
    subject: {
      id: 366165,
      image: 'http://lain.bgm.tv/pic/cover/c/5a/a2/366165_Ds2pa.jpg',
      name: '便利屋斎藤さん、異世界に行く',
      name_cn: '万事屋斋藤、到异世界',
      type: 2,
      rating: {
        rank: 2703,
        total: 691,
        score: 6.9
      },
      eps: 12
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1677353485
  }
}
