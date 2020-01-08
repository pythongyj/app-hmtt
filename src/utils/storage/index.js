// 本地操作 token 的 工具 模块
// 获取  token
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}

// 设置  token
export const setItem = (name, value) => {
  return window.localStorage.setItem(name, JSON.stringify(value))
}

// 删除 token
export const removeItem = name => {
  return window.localStorage.removeItem(name)
}
