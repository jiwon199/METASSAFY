import React, { Component } from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class MainVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <>
        {this.props.streamManager && (
          <VideoDivStyle>
            <OpenViduVideoComponent
              streamManager={this.props.streamManager}
              name={this.getNicknameTag()}
            />
          </VideoDivStyle>
        )}
      </>
    );
  }
}

const VideoDivStyle = styled.div`
  width: 100%;
  height: 100%;
`;
