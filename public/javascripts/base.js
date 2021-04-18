!(function () {
  let user = sessionStorage.getItem('userInfo')
  if (user) {
    user = JSON.parse(user)
    if (user.role === 'clerk') {
      $('#bs-example-navbar-collapse-1 ul').append(`<li>
      <a href="/clerk/viewMeals" class="theme">View meals</a>
    </li>`)
    }
    $('.navbar-right').html(`
    <li class="userInfo">
    <a href="/personal_center">
      ${user.firstName} ${user.lastName}
      </a>
    </li>
    <li>
      <a>
        <button type="button" class="btn btn-default navbar-btn btn-danger logout">Log out</button>
      </a>
    </li>
  `)
    $('.logout').click(function () {
      $.ajax({
        url: '/logout',
        success: function (res) {
          if (res.status === 200) {
            sessionStorage.removeItem('userInfo')
            location.href = '/'
          }
        },
      })
    })
  }
})()
