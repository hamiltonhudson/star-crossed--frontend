import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileDetail from './ProfileDetail';
import ProfileSun from './ProfileSun';
import Adapter from './Adapter';
import '../styling/Profile.css';
import '../styling/App.css';


class Profile extends React.Component {

  state = {
    clicked: '',
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({
      clicked: event.target.dataset.name
    })
  }

  render () {
    const profilePhoto = this.props.currentUser.photo
    return (
      <div className="prof-container">
        <div className="row" style={{"marginTop": "1vh", "marginBottom": ".5vh"}}>
          <Link to='/' onClick={() => {Adapter.signOut(); ; this.props.history.push("/")}} className="left-link col l3 m3 s6"> ◀︎ LogOut </Link>
          <Link to='/matches' className="center-link col l3 m3 s6"> △ Matches △ </Link>
          <Link to='/chat' className="center-link col l3 m3 s6"> ▲ Accepted ▲ </Link>
          <Link to='/edit' className="right-link col l3 m3 s6"> Edit ▷ </Link>
        </div><br/>
        <div className="prof-card">
          <div className="user-card row">
            <ProfileDetail clicked={this.state.clicked}/>
            <div className="col l4 m6 s12">
              <h3 className="card-title prof-name" data-name="name"
                onClick={(event) => this.handleClick(event)}>
                {this.props.currentUser.first_name}
              </h3>
              <span onClick={(event) => this.handleClick(event)}>
                {profilePhoto ? <img src={profilePhoto} alt="profile-img" className="prof-photo" data-name="photo"/> : null}
              </span>
              <br/>
              <h6 className="prof-sun" data-name="sun" onClick={(event) => this.handleClick(event)}> {this.props.currentUser.sun.sign} </h6>
            </div>
            <ProfileSun clicked={this.state.clicked}/>
          </div>
          <br/>
          <div className="row">
            <h2 className="match-sign-header glow2"> your sign's: </h2><br/>
            <hr id="match-profile-hr"/>
            <div className="match-sign-details">
              <span id="detail-name"> vibe </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.currentUser.sun.vibe}</span><br/>
              <span id="detail-name"> motto </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">"{this.props.currentUser.sun.motto}"</span><br/>
              <span id="detail-name"> compatible with </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info"> {this.props.currentUser.sun.compat_signs} </span><br/><br/>
              <div className="row">
                <div className="col l1 m1 s1 traits">
                  <span>
                    <span className="row">T</span>
                    <span className="row">R</span>
                    <span className="row">A</span>
                    <span className="row">I</span>
                    <span className="row">T</span>
                    <span className="row">S</span>
                  </span>
                </div>
                <div className="col l11 m11 s11">
                  <span id="detail-name"> good </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.currentUser.sun.good_traits}.</span><br/>
                  <span id="detail-name"> bad </span> <span style={{"fontFamily": "Datalegreya-Thin", "fontWeight": "bolder", "fontSize": "calc(1em + 1.25vw"}}> | </span> <span id="detail-info">{this.props.currentUser.sun.bad_traits}.</span><br/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/><br/>
      </div>
    )
  }

}

  const mapStateToProps = (state) => {
    return {
      currentUser: state.users.currentUser,
      userId: state.users.userId,
    }
  }

export default connect(mapStateToProps)(Profile);
