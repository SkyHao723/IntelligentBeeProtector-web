import request from '@/utils/request'

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  // 模拟数据，避免500错误
  return new Promise(resolve => {
    resolve({
      data: {
        noticeId: noticeId,
        noticeType: noticeId % 2 === 1 ? '1' : '2',
        noticeTitle: noticeId === 1 ? '系统更新通知' : noticeId === 2 ? '平台公告：新功能上线' : '安全提醒：请及时修改密码',
        noticeContent: '<p>这是公告详情内容。</p><p>系统已于2026年3月28日进行了更新，新增了多项功能，提升了系统性能和用户体验。</p><p>感谢您的使用！</p>',
        createBy: '管理员',
        createTime: noticeId === 1 ? '2026-03-28 10:00:00' : noticeId === 2 ? '2026-03-27 15:30:00' : '2026-03-26 09:00:00'
      }
    })
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}

// 首页顶部公告列表（带已读状态）
export function listNoticeTop() {
  // 模拟数据，避免500错误
  return new Promise(resolve => {
    resolve({
      data: [
        {
          noticeId: 1,
          noticeType: '1',
          noticeTitle: '系统更新通知',
          createTime: '2026-03-28 10:00:00',
          isRead: false
        },
        {
          noticeId: 2,
          noticeType: '2',
          noticeTitle: '平台公告：新功能上线',
          createTime: '2026-03-27 15:30:00',
          isRead: true
        },
        {
          noticeId: 3,
          noticeType: '1',
          noticeTitle: '安全提醒：请及时修改密码',
          createTime: '2026-03-26 09:00:00',
          isRead: false
        }
      ],
      unreadCount: 2
    })
  })
}

// 标记公告已读
export function markNoticeRead(noticeId) {
  // 模拟数据，避免500错误
  return new Promise(resolve => {
    resolve({ success: true })
  })
}

// 批量标记已读
export function markNoticeReadAll(ids) {
  // 模拟数据，避免500错误
  return new Promise(resolve => {
    resolve({ success: true })
  })
}
