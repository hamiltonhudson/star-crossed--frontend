class Adapter {

  static signedIn() {
    return !!localStorage.getItem('token')
  }

  static signOut() {
    localStorage.removeItem('token')
  }
  
}

export default Adapter
