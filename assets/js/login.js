$(function () {
  $('#link_reg').on('click', function () {
    $('.login').hide()
    $('.register').show()
  })
  $('#link_login').on('click', function () {
    $('.login').show()
    $('.register').hide()
  })

  //通过layui  获取form 对象 
  const form = layui.form
  //通过layui  获取layer 对象 
  const layer = layui.layer
  // layer.msg('只想弱弱提示');
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //注册表单验证 主要用于判断两次密码是否输入一致
    //这个 value 就表示将规则添加到哪个标签上的值
    repwd: function (value) {
      // console.log(value)
      // 判断 两次输入的密码是否一致
      if ($('.register #ipt-pwd').val() !== value)
        return '两次密码输入不一致'
    }
  })

  //监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('.register #ipt-uname').val(),
      password: $('.register #ipt-pwd').val()
    }
    $.post("/api/reguser",
      data,
      function (res) {
        if (res.status !== 0) {
          //使用 layer 提示信息
          return layer.msg(res.message)
        }
        //注意 传的不能是res  而是res.message
        layer.msg(res.message)
        $('#link_login').click()
      }
    );
  })
  //监听登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    //阻止默认行为
    e.preventDefault()
    //发起请求
    $.ajax({
      type: "POST",
      url: "/api/login",
      //快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg('登录失败')
        layer.msg('登录成功')
        //示例token
        //uname:kkkkkk pwd:000000
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIxNCwidXNlcm5hbWUiOiJra2tra2siLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY3NjQ0MjU2NCwiZXhwIjoxNjc2NDc4NTY0fQ.rPQIEvmljwiHglb6FidgBP6fQC-W5cZ5s0MSStSHAdY
        // console.log(res.token)
        //将获取到的token 进行本地存储
        localStorage.setItem('token', res.token)
        //页面跳转到后台主页
        location.href = './index.html'
      }
    });
  })
})