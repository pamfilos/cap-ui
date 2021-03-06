import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

import {login, logout} from '../../actions/auth';
import {getRecords} from '../../actions/records';

export class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box flex={true}>
        <Box flex={true} colorIndex="neutral-1-a" justify="center" align="center">
          <Section>
            <Box size="large">
              <Heading tag="h2"> Hello, {this.props.currentUser.get('email')}</Heading>
            </Box>
          </Section>
        </Box>
      </Box>
    );
  }
}

IndexPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get('isLoggedIn'),
    token: state.auth.get('token'),
    authLoading: state.auth.get('loading'),
    currentUser: state.auth.getIn(['currentUser', 'profile'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
