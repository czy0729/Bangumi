# Bangumi32

bgm.tv (Bangumi) 第三方客户端，React Native (Expo SDK 54) 项目。作者: czy0729

## 通用

- 优先选择编辑而非重写整个文件
- 除非文件被编辑过，否则不要重复阅读已读过的文件
- 输出追求简洁，但推理过程必须详尽


## 详细规范（按需读取）

> 触发对应业务时读取对应文件，不要一次性全部加载。

| 场景                                       | 文档                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| 了解项目结构、技术栈、路径别名、导航、构建 | [.claude/docs/architecture.md](.claude/docs/architecture.md) |
| 新建/修改页面（Screen）                    | [.claude/docs/screen.md](.claude/docs/screen.md)             |
| 查找/定位某个页面                          | [.claude/docs/screens.md](.claude/docs/screens.md)           |
| 新建/修改可复用组件（components/）         | [.claude/docs/component.md](.claude/docs/component.md)       |
| 新建/修改 MobX Store                       | [.claude/docs/store.md](.claude/docs/store.md)               |
| API 请求相关                               | [.claude/docs/api.md](.claude/docs/api.md)                   |
| 测试规范                                   | [.claude/docs/testing.md](.claude/docs/testing.md)           |
| Token 预算规则                             | [.claude/docs/token-budget.md](.claude/docs/token-budget.md) |
| 代码规范与风格                             | [.claude/docs/code-style.md](.claude/docs/code-style.md)     |

## 文档维护

当以下情况发生时，主动更新 `.claude/docs/` 中对应的文档：

- 新增或重构了页面模板/约定 → 更新 `screen.md`
- 新增/删除/重命名了页面 → 更新 `screens.md`
- 新增或重构了可复用组件模式 → 更新 `component.md`
- Store 继承链或文件结构变化 → 更新 `store.md`
- API 请求方式或常量位置变化 → 更新 `api.md`
- 新增路径别名、导航结构变化、技术栈升级 → 更新 `architecture.md`
- 发现代码风格约定与文档不符 → 更新 `code-style.md`
- 测试规范变化 → 更新 `testing.md`

原则：改了什么就更新什么，不要等用户提醒。
