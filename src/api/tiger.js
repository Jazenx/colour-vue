import fetch from 'utils/tigerFetch';

export function getWeiboData() {
  return fetch({
    // url: 'http://echarts.baidu.com/gallery/data/asset/data/weibo.json',
    url: '/static/weibo.json',
    method: 'get'
  })
}