import request from '@/utils/request'

// 获取首页数据
export const getHomeData = () => {
  return request.get('/page/detail', {
    // params is request need get()
    params: {
      pageId: 0
    }
  })
}
