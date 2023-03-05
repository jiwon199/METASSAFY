import styled from 'styled-components';
import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <VideoStyle autoPlay={true} ref={this.videoRef} />
        <UserNameStyle>{this.props.name}</UserNameStyle>
      </div>
    );
  }
}

const VideoStyle = styled.video`
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserNameStyle = styled.div`
  border-radius: 0 0 10px 10px;
  color: white;

  width: 100%;

  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;

  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
`;
