!(function () {
  $('.login_btn').click(function () {
    const data = $('.loginForm').serialize()
    $.ajax({
      url: '/login',
      method: 'post',
      data,
      success: (res) => {
        if (res.status === 200) {
          sessionStorage.setItem('userInfo', JSON.stringify(res.user))
          location.replace(`/${res.user.role}`)
        } else {
          const { err_msg } = res
          $('.error').css('display', 'block')
          $('.error').html(err_msg)
        }
      },
    })
  })
})()
