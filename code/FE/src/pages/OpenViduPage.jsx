import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './openVidu/UserVideoComponent';
import MainVideoComponent from './openVidu/MainVideoComponent';

import { FiX, FiAirplay, FiPhoneOff } from 'react-icons/fi';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { BiVideo, BiVideoOff } from 'react-icons/bi';

import styled from 'styled-components';

const APPLICATION_SERVER_URL = 'https://www.metassafy.store/api/session';

class OpenViduPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: this.props.roomSection,
      // myUserName: 'Participant' + Math.floor(Math.random() * 100),
      myUserName: this.props.user.name + '_' + this.props.user.user_id,
      sessionCamera: undefined,
      sessionScreen: undefined,
      shareScreen: undefined,
      screensharing: false,
      mainStreamManager: undefined,
      publisher: undefined,
      publishAudio: true,
      publishVideo: true,
      subscribers: [],
      subscriberScreens: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    //this.handleMainScreenStream = this.handleMainScreenStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.publishScreenShare = this.publishScreenShare.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.muteUnmuteVideo = this.muteUnmuteVideo.bind(this);
    this.muteUnmuteAudio = this.muteUnmuteAudio.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.leaveSession();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  // handleMainScreenStream(stream) {
  //   if (this.state.shareScreen !== stream) {
  //     this.setState({
  //       shareScreen: stream,
  //     });
  //   }
  // }

  sendMessage() {
    this.state.sessionCamera
      .signal({
        data: this.state.myUserName, // Any string (optional)
        to: this.state.subscribers, // Array of Connection objects (optional. Broadcast to everyone if empty)
      })
      .then(() => {
        // console.log('Message successfully sent');
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  muteUnmuteVideo() {
    if (this.state.publishVideo) {
      this.state.publisher.publishVideo(false);

      this.setState({
        publishVideo: false,
      });
    } else {
      this.state.publisher.publishVideo(true);

      this.setState({
        publishVideo: true,
      });
    }
  }

  muteUnmuteAudio() {
    if (this.state.publishAudio) {
      this.state.publisher.publishAudio(false);

      this.setState({
        publishAudio: false,
      });
    } else {
      this.state.publisher.publishAudio(true);

      this.setState({
        publishAudio: true,
      });
    }
  }

  deleteSubscriberScreens(streamManager) {
    let subscriberScreens = this.state.subscriberScreens;
    let index = subscriberScreens.indexOf(streamManager, 0);
    if (index > -1) {
      subscriberScreens.splice(index, 1);
      this.setState({
        subscriberScreens: subscriberScreens,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();
    // screen share
    this.OVScreen = new OpenVidu();

    // --- 2) Init a session --

    this.setState(
      {
        sessionCamera: this.OV.initSession(), // 카메라 세션 생성
        sessionScreen: this.OVScreen.initSession(), // 스크린 쉐어 세션
      },
      () => {
        var sessionCamera = this.state.sessionCamera;
        var sessionScreen = this.state.sessionScreen;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        sessionCamera.on('streamCreated', (event) => {
          if (event.stream.typeOfVideo === 'CAMERA') {
            // Subscribe to the Stream to receive it. Second parameter is undefined
            // so OpenVidu doesn't create an HTML video by its own
            let subscriber = sessionCamera.subscribe(event.stream, undefined);
            let subscribers = this.state.subscribers;
            subscribers.push(subscriber);

            // Update the state with the new subscribers
            this.setState({
              subscribers: subscribers,
            });
          }
        });

        sessionCamera.on('signal', (event) => {
          // console.log(event.data); // Message
          // console.log(event.from); // Connection object of the sender
          // console.log(event.type); // The type of message
        });

        sessionCamera.on('signal:my-chat', (event) => {
          // console.log(event.data); // Message
          // console.log(event.from); // Connection object of the sender
          // console.log(event.type); // The type of message ("my-chat")
        });

        sessionScreen.on('streamCreated', (event) => {
          if (event.stream.typeOfVideo === 'SCREEN') {
            // Subscribe to the Stream to receive it. HTML video will be appended to element with 'container-cameras' id
            let subscriberScreen = sessionScreen.subscribe(
              event.stream,
              undefined
            );
            let subscriberScreens = this.state.subscriberScreens;
            subscriberScreens.push(subscriberScreen);
            this.setState({
              subscriberScreens: subscriberScreens,
            });
          }
        });

        // On every Stream destroyed...
        sessionCamera.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        sessionCamera.on('exception', (exception) => {
          // console.warn(exception);
        });

        sessionScreen.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriberScreens(event.stream.streamManager);
        });

        sessionScreen.on('exception', (exception) => {
          // console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          this.state.sessionCamera
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---
              sessionCamera.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                sessionCamera: sessionCamera,
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {});
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((tokenScreen) => {
          // Create a token for screen share
          this.state.sessionScreen
            .connect(tokenScreen, { clientData: this.state.myUserName })
            .then(() => {
              document.getElementById('buttonScreenShare').style.visibility =
                'visible';
            })
            .catch((error) => {
              // console.log(
              //   'There was an error connecting to the session:',
              //   error.code,
              //   error.message
              // );
            });
        });
      }
    );
  }

  async publishScreenShare() {
    let shareScreen = await this.OVScreen.initPublisherAsync(undefined, {
      videoSource: 'screen', // The source of video. If undefined default webcam
    });

    shareScreen.once('accessAllowed', (event) => {
      document.getElementById('buttonScreenShare').style.visibility = 'hidden';
      this.setState({
        screensharing: true,
      });

      // If the user closes the shared window or stops sharing it, unpublish the stream
      shareScreen.stream
        .getMediaStream()
        .getVideoTracks()[0]
        .addEventListener('ended', () => {
          this.state.sessionScreen.unpublish(this.state.shareScreen);
          document.getElementById('buttonScreenShare').style.visibility =
            'visible';

          this.setState({
            screensharing: false,
            shareScreen: undefined,
          });
        });

      this.state.sessionScreen.publish(shareScreen);

      this.setState({
        shareScreen: shareScreen,
      });
    });

    shareScreen.on('videoElementCreated', (event) => {
      // console.log(
      //   'shareScreen videoElementCreated-----------------------' + event
      // );
      event.element['muted'] = true;
    });

    shareScreen.once('accessDenied', (event) => {
      this.state.shareScreen = undefined;
      // console.error('Screen Share: Access Denied');
    });
  }

  leaveSession() {
    const sessionCamera = this.state.sessionCamera;
    const sessionScreen = this.state.sessionScreen;

    if (sessionCamera) {
      sessionCamera.disconnect();
    }
    if (sessionScreen) {
      sessionScreen.disconnect();
    }

    this.OV = null;
    this.setState({
      mySessionId: this.props.roomSection,
      // myUserName: 'Participant' + Math.floor(Math.random() * 100),
      myUserName: this.props.user.name + '_' + this.props.user.user_id,
      sessionCamera: undefined,
      sessionScreen: undefined,
      shareScreen: undefined,
      screensharing: false,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      subscriberScreens: [],
    });
  }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV.getDevices();
  //     var videoDevices = devices.filter(
  //       (device) => device.kind === 'videoinput'
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = this.OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await this.state.sessionCamera.unpublish(
  //           this.state.mainStreamManager
  //         );

  //         await this.state.sessionCamera.publish(newPublisher);
  //         this.setState({
  //           currentVideoDevice: newVideoDevice[0],
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <SectionStyle>
        {/* <div>{this.props.user.name}</div> */}
        {!this.state.sessionCamera && (
          <WaitingRoomStyle>
            <LogoDivStyle id="img-div">
              <img
                src="images/logo.png"
                style={{ width: '200px' }}
                alt="회의실"
              />
            </LogoDivStyle>
            <JoinDivStyle>
              <TitleStyle>회의실에 참여하세요</TitleStyle>
              <form onSubmit={this.joinSession}>
                <InputWrapperStyle>
                  <LabelStyle>참여자 이름</LabelStyle>
                  <InputStyle
                    type="text"
                    id="userName"
                    value={myUserName}
                    // value={
                    //   this.props.user.name + '_' + this.props.user.user_id ||
                    //   'Me'
                    // }
                    onChange={this.handleChangeUserName}
                    required
                    // 읽기 전용 readOnly
                  />
                </InputWrapperStyle>
                <InputWrapperStyle>
                  <LabelStyle>Session</LabelStyle>
                  <InputStyle
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                    // 읽기 전용 readOnly
                  />
                </InputWrapperStyle>
                <ButtonWrapperStyle>
                  <BtnStyle>Join</BtnStyle>
                </ButtonWrapperStyle>
              </form>
            </JoinDivStyle>
          </WaitingRoomStyle>
        )}

        {this.state.sessionCamera && (
          <MeetingRoomStyle>
            <TopDivStyle id="session">
              {this.state.mainStreamManager && (
                <MainVideoWrapperStyle id="main-video">
                  <MainVideoComponent
                    streamManager={this.state.mainStreamManager}
                  />
                </MainVideoWrapperStyle>
              )}

              <SubVideoWrapperStyle>
                {/* 공유화면 */}
                {(this.state.shareScreen ||
                  !!this.state.subscriberScreens.length) && (
                  <ShareWrapperStyle id="screen-container">
                    {this.state.shareScreen && (
                      <SharingVideoStyle
                        onClick={() =>
                          this.handleMainVideoStream(this.state.shareScreen)
                        }
                      >
                        <UserVideoComponent
                          streamManager={this.state.shareScreen}
                        />
                      </SharingVideoStyle>
                    )}
                    {this.state.subscriberScreens.map((sub, i) => (
                      <SharingVideoStyle
                        key={i}
                        onClick={() => this.handleMainVideoStream(sub)}
                      >
                        <UserVideoComponent streamManager={sub} />
                      </SharingVideoStyle>
                    ))}
                  </ShareWrapperStyle>
                )}

                {/* 얼굴 */}
                <FaceWrapperStyle id="video-container">
                  {this.state.publisher && (
                    <PersonVideoStyle
                      onClick={() =>
                        this.handleMainVideoStream(this.state.publisher)
                      }
                    >
                      <UserVideoComponent
                        streamManager={this.state.publisher}
                      />
                    </PersonVideoStyle>
                  )}
                  {this.state.subscribers.map((sub, i) => (
                    <PersonVideoStyle
                      key={i}
                      onClick={() => this.handleMainVideoStream(sub)}
                    >
                      <UserVideoComponent streamManager={sub} />
                    </PersonVideoStyle>
                  ))}
                </FaceWrapperStyle>
              </SubVideoWrapperStyle>
            </TopDivStyle>
            <BottomDivStyle>
              <MeetingTitleStyle>{mySessionId}</MeetingTitleStyle>
              <ControlButtonWrapperStyle>
                <ControlButtonStyle
                  id="buttonScreenShare"
                  onClick={this.publishScreenShare}
                  color={!this.state.shareScreen}
                >
                  {!!this.state.shareScreen ? <FiX /> : <FiAirplay />}
                </ControlButtonStyle>
                <ControlButtonStyle
                  id="buttonMuteAudio"
                  onClick={this.muteUnmuteAudio}
                  color={!!this.state.publishAudio}
                >
                  {this.state.publishAudio ? (
                    <BiVolumeFull />
                  ) : (
                    <BiVolumeMute />
                  )}
                </ControlButtonStyle>
                <ControlButtonStyle
                  id="buttonMuteVideo"
                  onClick={this.muteUnmuteVideo}
                  color={!!this.state.publishVideo}
                >
                  {this.state.publishVideo ? <BiVideo /> : <BiVideoOff />}
                </ControlButtonStyle>

                <ControlButtonStyle
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
                  color={false}
                >
                  <FiPhoneOff />
                </ControlButtonStyle>
              </ControlButtonWrapperStyle>
            </BottomDivStyle>
          </MeetingRoomStyle>
        )}
      </SectionStyle>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL,
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + `/${sessionId}/connections`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The token
  }
}

// export default OpenViduPage;

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(OpenViduPage);

const SectionStyle = styled.section`
  width: 100%;
  height: 100%;
`;

const WaitingRoomStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LogoDivStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  width: 40%;
`;

const JoinDivStyle = styled.div`
  width: 60%;
  padding: 1rem;
`;

const TitleStyle = styled.p`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const InputWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const LabelStyle = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const InputStyle = styled.input`
  width: 50%;
  padding: 0.3rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #2c343b;
  border-bottom: 1px solid #cccccc;

  &:active,
  &:focus {
    outline: none;
  }
`;

const ButtonWrapperStyle = styled.div`
  margin-top: 2.5rem;
  width: 50%;
  display: flex;
  justify-content: center;
`;

const BtnStyle = styled.button`
  position: relative;
  border: none;
  min-width: 200px;
  min-height: 50px;
  background: linear-gradient(90deg, #cec2f4 0%, #d0a9e5 100%);
  border-radius: 1000px;
  color: 'white';
  cursor: pointer;
  box-shadow: 12px 12px 24px rgba(164, 141, 237, 0.64);
  font-weight: 700;
  font-size: 20px;
  transition: 0.3s;

  :hover {
    transform: scale(1.2);
  }

  :hover::after {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 6px solid #c5c7ff;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ring 1.5s infinite;
  }

  @keyframes ring {
    0% {
      width: 30px;
      height: 30px;
      opacity: 1;
    }
    100% {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;

const MeetingRoomStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TopDivStyle = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
`;

const MainVideoWrapperStyle = styled.div`
  width: 55%;
  height: 100%;
  margin-right: 0.7rem;
  display: flex;
  align-items: center;
  /* background-color: pink; */
`;

const SubVideoWrapperStyle = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
`;

const ShareWrapperStyle = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
  margin-bottom: 0.5rem;
  /* background-color: beige; */
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #617485;
    border-radius: 10px;
    background-clip: padding-box;
    /* border: 1px solid transparent; */
  }
  &::-webkit-scrollbar-track {
    /* background-color: #617485; */
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const SharingVideoStyle = styled.div`
  max-width: 33%;
  height: 100%;
  object-fit: contain;
`;

const FaceWrapperStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  width: 100%;
  height: 80%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #617485;
    border-radius: 10px;
    background-clip: padding-box;
    /* border: 1px solid transparent; */
  }
  &::-webkit-scrollbar-track {
    /* background-color: #617485; */
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const PersonVideoStyle = styled.div`
  width: 33%;
  height: 33%;
`;

const ControlButtonStyle = styled.button`
  background-color: ${(props) => (props.color ? '#eadcff' : '#fd4242')};
  color: ${(props) => (props.color ? 'gray' : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0px;
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
`;

const BottomDivStyle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MeetingTitleStyle = styled.p`
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  margin-left: 1rem;
`;

const ControlButtonWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
`;
