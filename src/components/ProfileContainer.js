import React from 'react';
import { connect } from 'react-redux'
import SignIn from './SignIn'
import ProfileDetail from './ProfileDetail'
import { accetMatch, declineMatch } from '../actions'

class ProfileContainer extends React.Component {

  // renderProfileDetails = () => this.props.map((detail, id) => <ProfileDetail key={id} text={detail} />)


  // <Card header={<CardTitle reveal image={"img/office.jpg"} waves='light'/>}
  //   title="Card Title"
  //   reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
  //   <p><a href="#">This is a link</a></p>
  // </Card>

  render () {
    console.log("state in profilecontainer is", this.state)
    console.log("props in profilecontainer is", this.props)
    console.log(this.props.currentUser)

    return (
      <div>
        <div class="cardContent">
          <span class="card-title">Profile</span>
          {
            this.props.currentUser ?
              <ProfileDetail
                user={this.props.curentUser}
                currentUser={this.props.currentUser}
                // handleFilter={this.props.handleFilter}
                // handleSorted={this.props.handleSorted}
                // handleMyMatches={this.props.handleMyMatches}
              />
            :
            <SignIn />
          }
          {/* <p>{this.props.first_name} {this.props.last_name}</p>
          <p>{this.props.birth_month}/{this.props.birth_day}/{this.props.birth_year}</p> */}
        </div>
        {/* {this.renderProfileDetails()} */}
        </div>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     // newUser: state.newUser
//       first_name: this.state.first_name,
//       last_name: this.state.last_name,
//       birth_year: this.state.birth_year,
//       birth_month: this.state.birth_month,
//       birth_day: this.state.birth_day,
//     }
//   }
//
//   const mapStateToProps = (state) => {
//     return {
//       users: state.users,
//       suns: state.suns
//     }
//   }
export default ProfileContainer;
// export default connect(mapStateToProps)(ProfileContainer);
