class Adapter {

  static signedIn() {
    return !!localStorage.getItem('token')
  }

  static signOut() {
    // localStorage.removeItem('token')
    (document.cookie).exists ?
    document.cookies.remove('X-Authorization=' + localStorage.getItem('token') + '; path=/') && localStorage.removeItem('token')
    :
    localStorage.removeItem('token')
    // fetch('http://localhost:3000/api/v1/auth', {
    //   method: 'DELETE',
    //   credentials: 'include'
    // })
  }

}

export default Adapter
