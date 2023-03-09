/*
 * @Author: czy0729
 * @Date: 2023-02-25 17:52:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-09 17:46:48
 */
import { WebHookUserCollection, WebHookUserEp } from '../src/utils/webhooks/types'

type Test<T extends (...args: any) => any> = {
  type: Parameters<T>[0]
  data: Parameters<T>[1]
}

/**
 * 更新收藏 (示例1)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 看过 [异世界舅舅](https://bgm.tv/subject/339326)
 * 30秒前
 * */
export const userCollection: Test<WebHookUserCollection> = {
  type: 'user_collection',
  data: {
    type: 2,
    rate: 0,
    comment: '',
    private: false,
    tags: ['2022年7月', '漫画改', '异世界'],
    subject: {
      id: 339326,
      image: 'http://lain.bgm.tv/pic/cover/c/1a/75/339326_v466V.jpg',
      name: '異世界おじさん',
      name_cn: '异世界舅舅',
      type: 2,
      rating: {
        rank: 516,
        total: 5019,
        score: 7.7
      },
      eps: 13
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678348542
  }
}

/**
 * 更新章节 (示例1: 单集更新)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 看过 [ep13 感谢大家的一路陪伴](https://bgm.tv/ep/1116553)
 * [异世界舅舅](https://bgm.tv/subject/339326)
 * 30秒前
 * */
export const userEp: Test<WebHookUserEp> = {
  type: 'user_ep',
  data: {
    type: 2,
    batch: false,
    eps: 13,
    ep: {
      id: 1116553,
      airdate: '2023-03-08',
      name: '',
      name_cn: '感谢大家的一路陪伴',
      duration: '00:23:40',
      comment: 195
    },
    subject: {
      id: 339326,
      image: 'http://lain.bgm.tv/pic/cover/c/1a/75/339326_v466V.jpg',
      name: '異世界おじさん',
      name_cn: '异世界舅舅',
      type: 2,
      rating: {
        rank: 516,
        total: 5019,
        score: 7.7
      },
      eps: 13
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678355170
  }
}

/**
 * 更新章节 (示例2: 看到)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 完成了 [异世界舅舅](https://bgm.tv/subject/339326) 13 of 13 话
 * 30秒前
 * */
export const userEp_2: Test<WebHookUserEp> = {
  type: 'user_ep',
  data: {
    type: 0,
    batch: true,
    eps: 13,
    vols: undefined,
    ep: {
      id: 1116553,
      airdate: '2023-03-08',
      name: '',
      name_cn: '感谢大家的一路陪伴',
      duration: '00:23:40',
      comment: 195
    },
    subject: {
      id: 339326,
      image: 'http://lain.bgm.tv/pic/cover/c/1a/75/339326_v466V.jpg',
      name: '異世界おじさん',
      name_cn: '异世界舅舅',
      type: 2,
      rating: {
        rank: 516,
        total: 5019,
        score: 7.7
      },
      eps: 13
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678353656
  }
}

/**
 * 更新章节 (示例3: 漫画看过)
 *
 * [咕咕子❶](https://bgm.tv/user/sukaretto) 读过 [彼女の友達](https://bgm.tv/subject/335152) 第3卷
 * 30秒前
 * */
export const userEp_3: Test<WebHookUserEp> = {
  type: 'user_ep',
  data: {
    type: 2,
    batch: false,
    eps: 1,
    vols: 3,
    ep: {
      id: 0,
      airdate: '',
      name: '',
      name_cn: '',
      duration: '',
      comment: 0
    },
    subject: {
      id: 335152,
      image: 'http://lain.bgm.tv/pic/cover/c/41/19/335152_7K8pa.jpg',
      name: '彼女の友達',
      name_cn: '女友的朋友',
      type: 1,
      rating: {
        rank: 5690,
        total: 38,
        score: 5.3
      },
      eps: ''
    },
    user: {
      id: 456208,
      username: 'sukaretto',
      avatar: 'http://lain.bgm.tv/pic/user/l/000/45/62/456208.jpg?r=1677056307&hd=1',
      nickname: '咕咕子❶',
      sign: '✨️make bangumi great again✨️'
    },
    ts: 1678354667
  }
}
