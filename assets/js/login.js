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
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
  })
})