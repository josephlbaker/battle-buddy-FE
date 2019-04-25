import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Grid, Segment, Button } from 'semantic-ui-react'


export default class LogIn extends Component {
  // state = {
  //   redirect: false
  // }
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/' />
  //   }
  // }

  render() {
    return (
      <div>
        <form>
          <Segment className="form-segment">
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <input name="email" placeholder="Email" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <input type="password" name="password" placeholder="Password" onChange={this.props.handleInput} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Button fluid name="login" onClick={this.props.handleLogin} secondary>
                    Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </form>
      </div >
    )
  }
}
