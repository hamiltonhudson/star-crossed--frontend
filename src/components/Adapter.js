class Adapter {

  static signedIn() {
    return !!localStorage.getItem('token')
  }

  static delete_cookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }

  static signOut() {
    this.delete_cookie('X-Authorization');
    localStorage.removeItem('token')
    // localStorage.removeItem('token')
    // fetch('http://localhost:3000/api/v1/auth', {
    //   method: 'DELETE',
    //   credentials: 'include'
    // })
  }

}

export default Adapter
