$(function () {
  $('.layui-layout-right').on('mousemove', 'li', function () {
    const id = $(this).index()
    if (id) {
      $(this).parent().css('overflow', 'hidden')
    } else {
      $(this).parent().css('overflow', 'visible')
    }
  })
  getUserInfo()
  //点击按钮 实现退出功能
  const layer = layui.layer
  $('#btnLogout').on('click', function () {
    //eg1
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      //做两件事情
      //1.清除token
      //2.返回到登录页面
      // console.log('点击')
      localStorage.removeItem('token')
      location.href = './login.html'
      layer.close(index);
    });
  })
})
//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    //headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      console.log(res)
      if (res.status !== 0) return layui.layer.msg(res.message)
      //渲染用户头像
      renderAvatar(res.data)
    },
    //控制用户的访问权限
    //在发起ajax请求的时候 不论成功还是失败 都是调用回调函数
    //complete
    // complete: function (res) {
    //   console.log(res)
    //   console.log('complete')
    //   console.log(res.responseJSON)
    //   //这里要做两件事 
    //   //1.清除token
    //   //2.强制跳转到login.html
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem('token')
    //     location.href = './login.html'
    //   }

    // }
  });
  //渲染用户头像
  function renderAvatar(user) {
    const name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //判断用户是否有头像 如果数据中有则显示img 隐藏span
    //如果没有头像 则隐藏img 显示字母头像
    if (user.user_pic !== null) {
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
      $('.text-avatar').hide()
    } else {
      const first = name[0].toUpperCase()
      $('.layui-nav-img').hide()
      $('.text-avatar')
        .html(first)
        .show()
    }
  }
}