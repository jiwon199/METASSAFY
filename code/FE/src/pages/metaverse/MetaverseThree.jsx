import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// gltfLoader사용
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Player } from './Player';
import { Portal } from './Portal';
import { Map } from './Map';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from 'gsap';
import { DoubleSide } from 'three';

import phoneImg from '../../assets/images/phone.png';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getJsonLocalUserInfo } from '../../utils/local-storage';
import { height } from '@mui/system';

function MetaverseThree() {
  const canvasRef = useRef(null); // useRef사용
  const [canvasTag, setCanvasTag] = useState([]);
  const [isPhone, setIsPhone] = useState(false);
  const navigate = useNavigate();
  const user = getJsonLocalUserInfo()['user_id'] || 'annonymous';

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 1000;

    setCanvasTag(canvas);

    // Loader
    // gltf로더 로드
    let gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    gltfLoader.setDRACOLoader(dracoLoader);

    // Texture - 바닥 텍스쳐
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load('images/map_v11.png');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 1;
    floorTexture.repeat.y = 1;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    // Camera

    const camera = new THREE.OrthographicCamera(
      -(window.innerWidth / window.innerHeight), // left
      window.innerWidth / window.innerHeight, // right,
      1, // top
      -1, // bottom
      -1000,
      1000
    );
    const cameraPosition = new THREE.Vector3(1, 2.5, 5);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.zoom = 0.2;
    camera.updateProjectionMatrix();
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight('white', 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 0.5);
    const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;

    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    // 그림자 범위
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = -100;
    directionalLight.shadow.camera.far = 100;
    scene.add(directionalLight);

    // Mesh
    const meshes = [];

    const phoneExTexture = textureLoader.load('images/phoneEx.png');
    phoneExTexture.wrapS = THREE.RepeatWrapping;
    phoneExTexture.wrapT = THREE.RepeatWrapping;
    phoneExTexture.repeat.x = 1;
    phoneExTexture.repeat.y = 1;
    // MetaSSAFY로고 회전
    const phoneExMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 3),
      new THREE.MeshStandardMaterial({
        map: phoneExTexture,
        side: DoubleSide,
      })
    );
    phoneExMesh.name = 'phoneEx';
    phoneExMesh.receiveShadow = true;
    phoneExMesh.position.set(9, 2, 6);
    scene.add(phoneExMesh);
    meshes.push(phoneExMesh);

    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        map: floorTexture,
      })
    );
    floorMesh.name = 'floor';
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);
    meshes.push(floorMesh);

    // Texture - 포탈 텍스쳐
    const portalTexture = textureLoader.load('images/logo.png');
    portalTexture.wrapS = THREE.RepeatWrapping;
    portalTexture.wrapT = THREE.RepeatWrapping;
    portalTexture.repeat.x = 1;
    portalTexture.repeat.y = 1;
    // MetaSSAFY로고 회전
    const portalMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: portalTexture,
        alphaMap: portalTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    portalMesh.name = 'portal';
    portalMesh.rotation.y = Math.PI / 3;
    portalMesh.receiveShadow = true;
    portalMesh.position.set(0, 2, 8);
    scene.add(portalMesh);
    meshes.push(portalMesh);

    // 집 로드
    const portal_metassafy = new Portal({
      gltfLoader,
      scene,
      modelSrc: '/model/portal.glb',
      x: 0,
      y: 0,
      z: 8,
    });

    // 스팟매쉬 - spotMeshMetaSSAFY
    const spotMeshMetaSSAFY = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'purple',
        transparent: true,
        opacity: 0.0,
      })
    );
    spotMeshMetaSSAFY.position.set(0, 0.01, 8);
    spotMeshMetaSSAFY.rotation.x = -Math.PI / 2;
    spotMeshMetaSSAFY.receiveShadow = true;
    scene.add(spotMeshMetaSSAFY);

    // Texture - 싸피 텍스쳐
    const ImgRelToSSAFYTexture = textureLoader.load('images/SSAFY.png');
    ImgRelToSSAFYTexture.wrapS = THREE.RepeatWrapping;
    ImgRelToSSAFYTexture.wrapT = THREE.RepeatWrapping;
    ImgRelToSSAFYTexture.repeat.x = 1;
    ImgRelToSSAFYTexture.repeat.y = 1;

    const ImgRelToSSAFYMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToSSAFYTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToSSAFYMesh.name = 'ImgRelToSSAFY';
    ImgRelToSSAFYMesh.receiveShadow = true;
    ImgRelToSSAFYMesh.position.set(2, 1.5, -6);
    scene.add(ImgRelToSSAFYMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu SSAFY
    const spotMeshSSAFY = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'pink',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshSSAFY.position.set(2, 0.05, -5);
    spotMeshSSAFY.rotation.x = -Math.PI / 2;
    spotMeshSSAFY.receiveShadow = true;
    scene.add(spotMeshSSAFY);

    // Texture - 깃랩
    const ImgRelToGitlabTexture = textureLoader.load('images/gitlab.png');
    ImgRelToGitlabTexture.wrapS = THREE.RepeatWrapping;
    ImgRelToGitlabTexture.wrapT = THREE.RepeatWrapping;
    ImgRelToGitlabTexture.repeat.x = 1;
    ImgRelToGitlabTexture.repeat.y = 1;

    const ImgRelToGitlabMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToGitlabTexture,
        // alphaMap: ImgRelToGitlabTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToGitlabMesh.name = 'ImgRelToGitlab';
    ImgRelToGitlabMesh.receiveShadow = true;
    ImgRelToGitlabMesh.position.set(-2, 1.5, -6);
    scene.add(ImgRelToGitlabMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu Gitlab
    const spotMeshGitlab = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshGitlab.position.set(-2, 0.05, -5);
    spotMeshGitlab.rotation.x = -Math.PI / 2;
    spotMeshGitlab.receiveShadow = true;
    scene.add(spotMeshGitlab);

    // Texture - 깃랩
    const ImgRelToMMTexture = textureLoader.load('images/mattermost.png');
    ImgRelToMMTexture.wrapS = THREE.RepeatWrapping;
    ImgRelToMMTexture.wrapT = THREE.RepeatWrapping;
    ImgRelToMMTexture.repeat.x = 1;
    ImgRelToMMTexture.repeat.y = 1;

    const ImgRelToMMMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToMMTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToMMMesh.name = 'ImgRelToMM';
    ImgRelToMMMesh.receiveShadow = true;
    ImgRelToMMMesh.position.set(6, 1.5, -6);
    scene.add(ImgRelToMMMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu MM
    const spotMeshMM = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshMM.position.set(6, 0.05, -5);
    spotMeshMM.rotation.x = -Math.PI / 2;
    spotMeshMM.receiveShadow = true;
    scene.add(spotMeshMM);

    // Texture
    const ImgRelToJiraTexture = textureLoader.load('images/jira.png');
    ImgRelToJiraTexture.wrapS = THREE.RepeatWrapping;
    ImgRelToJiraTexture.wrapT = THREE.RepeatWrapping;
    ImgRelToJiraTexture.repeat.x = 1;
    ImgRelToJiraTexture.repeat.y = 1;

    const ImgRelToJiraMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToJiraTexture,
        // alphaMap: ImgRelToJiraTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToJiraMesh.name = 'ImgRelToJira';
    ImgRelToJiraMesh.receiveShadow = true;
    ImgRelToJiraMesh.position.set(-6, 1.5, -6);
    scene.add(ImgRelToJiraMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu Jira
    const spotMeshJira = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshJira.position.set(-6, 0.05, -5);
    spotMeshJira.rotation.x = -Math.PI / 2;
    spotMeshJira.receiveShadow = true;
    scene.add(spotMeshJira);

    // Texture -
    const ImgRelToSWEATexture = textureLoader.load('images/swea.png');
    ImgRelToSWEATexture.wrapS = THREE.RepeatWrapping;
    ImgRelToSWEATexture.wrapT = THREE.RepeatWrapping;
    ImgRelToSWEATexture.repeat.x = 1;
    ImgRelToSWEATexture.repeat.y = 1;

    const ImgRelToSWEAMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToSWEATexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToSWEAMesh.name = 'ImgRelToSWEA';
    ImgRelToSWEAMesh.receiveShadow = true;
    ImgRelToSWEAMesh.position.set(6, 1.5, 7);
    scene.add(ImgRelToSWEAMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu SWEA
    const spotMeshSWEA = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshSWEA.position.set(6, 0.05, 8);
    spotMeshSWEA.rotation.x = -Math.PI / 2;
    spotMeshSWEA.receiveShadow = true;
    scene.add(spotMeshSWEA);

    // Texture -
    const ImgRelToWebexTexture = textureLoader.load('images/webex.png');
    ImgRelToWebexTexture.wrapS = THREE.RepeatWrapping;
    ImgRelToWebexTexture.wrapT = THREE.RepeatWrapping;
    ImgRelToWebexTexture.repeat.x = 1;
    ImgRelToWebexTexture.repeat.y = 1;

    const ImgRelToWebexMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        map: ImgRelToWebexTexture,
        transparent: true,
        side: DoubleSide,
      })
    );
    ImgRelToWebexMesh.name = 'ImgRelToWebex';
    ImgRelToWebexMesh.receiveShadow = true;
    ImgRelToWebexMesh.position.set(-6, 1.5, 7);
    scene.add(ImgRelToWebexMesh);
    meshes.push(portalMesh);

    // 스팟매쉬 - Edu Webex
    const spotMeshWebex = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 'red',
        transparent: true,
        opacity: 0,
      })
    );
    spotMeshWebex.position.set(-6, 0.05, 8);
    spotMeshWebex.rotation.x = -Math.PI / 2;
    spotMeshWebex.receiveShadow = true;
    scene.add(spotMeshWebex);

    // 캐릭터 위치 나타낼 포인터 메쉬
    const pointerMeshTexture = textureLoader.load('/images/sta3r.png');

    const pointerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: pointerMeshTexture,
        transparent: true,
        color: 'skyblue',
        opacity: 0.5,
      })
    );
    pointerMesh.rotation.x = -Math.PI / 2;
    pointerMesh.position.y = 0.01;
    pointerMesh.receiveShadow = true;
    scene.add(pointerMesh);

    const player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: '/models/people.glb',
    });

    const raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let destinationPoint = new THREE.Vector3();
    let angle = 0;
    let isPressed = false; // 마우스를 누르고 있는 상태

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      portalMesh.rotateY(delta);
      ImgRelToGitlabMesh.rotateY(delta * 0.1);
      ImgRelToJiraMesh.rotateY(-delta * 0.1);
      ImgRelToMMMesh.rotateY(delta * 0.1);
      ImgRelToSSAFYMesh.rotateY(-delta * 0.1);
      ImgRelToWebexMesh.rotateY(delta * 0.1);
      ImgRelToSWEAMesh.rotateY(-delta * 0.1);

      if (player.mixer) player.mixer.update(delta);
      if (portal_metassafy.mixer) portal_metassafy.mixer.update(delta);

      if (player.modelMesh) {
        camera.lookAt(player.modelMesh.position);
      }

      if (player.modelMesh) {
        if (isPressed) {
          raycasting();
        }

        if (player.moving) {
          // 걸어가는 상태
          angle = Math.atan2(
            destinationPoint.z - player.modelMesh.position.z,
            destinationPoint.x - player.modelMesh.position.x
          );
          player.modelMesh.position.x += Math.cos(angle) * 0.05;
          player.modelMesh.position.z += Math.sin(angle) * 0.05;

          camera.position.x = cameraPosition.x + player.modelMesh.position.x;
          camera.position.z = cameraPosition.z + player.modelMesh.position.z;

          player.actions[0].stop();
          player.actions[1].play();

          if (
            Math.abs(destinationPoint.x - player.modelMesh.position.x) < 0.03 &&
            Math.abs(destinationPoint.z - player.modelMesh.position.z) < 0.03
          ) {
            player.moving = false;
          }

          //REDIRECTION
          if (
            Math.abs(
              spotMeshMetaSSAFY.position.x - player.modelMesh.position.x
            ) < 1 &&
            Math.abs(
              spotMeshMetaSSAFY.position.z - player.modelMesh.position.z
            ) < 1
          ) {
            window.location.href = 'https://www.metassafy.store/unity';
          }
          if (
            Math.abs(spotMeshSSAFY.position.x - player.modelMesh.position.x) <
              1 &&
            Math.abs(spotMeshSSAFY.position.z - player.modelMesh.position.z) < 1
          ) {
            window.location.href = 'http://edu.ssafy.com';
          }
          if (
            Math.abs(spotMeshGitlab.position.x - player.modelMesh.position.x) <
              1 &&
            Math.abs(spotMeshGitlab.position.z - player.modelMesh.position.z) <
              1
          ) {
            window.location.href = 'https://lab.ssafy.com/';
          }

          if (
            Math.abs(spotMeshSWEA.position.x - player.modelMesh.position.x) <
              1 &&
            Math.abs(spotMeshSWEA.position.z - player.modelMesh.position.z) < 1
          ) {
            window.location.href = 'https://swexpertacademy.com/';
          }
          if (
            Math.abs(spotMeshJira.position.x - player.modelMesh.position.x) <
              1 &&
            Math.abs(spotMeshJira.position.z - player.modelMesh.position.z) < 1
          ) {
            window.location.href = 'https://ssafy.atlassian.net/jira/your-work';
          }
          if (
            Math.abs(spotMeshWebex.position.x - player.modelMesh.position.x) <
              1 &&
            Math.abs(spotMeshWebex.position.z - player.modelMesh.position.z) < 1
          ) {
            window.location.href =
              'https://ssafyclass.webex.com/webappng/sites/ssafyclass/dashboard?siteurl=ssafyclass';
          }
          if (
            Math.abs(spotMeshMM.position.x - player.modelMesh.position.x) < 1 &&
            Math.abs(spotMeshMM.position.z - player.modelMesh.position.z) < 1
          ) {
            window.location.href = 'https://meeting.ssafy.com/';
          }
        } else {
          // 서 있는 상태
          player.actions[1].stop();
          player.actions[0].play();
        }
      }

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function checkIntersects() {
      const intersects = raycaster.intersectObjects(meshes);
      for (const item of intersects) {
        if (item.object.name === 'floor') {
          destinationPoint.x = item.point.x;
          destinationPoint.y = 0.3;
          destinationPoint.z = item.point.z;
          player.modelMesh.lookAt(destinationPoint);
          player.moving = true;
          pointerMesh.position.x = destinationPoint.x;
          pointerMesh.position.z = destinationPoint.z;
        }
        break;
      }
    }

    function setSize() {
      camera.left = -(window.innerWidth / window.innerHeight);
      camera.right = window.innerWidth / window.innerHeight;
      camera.top = 1;
      camera.bottom = -1;

      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize', setSize);

    // 마우스 좌표를 three.js에 맞게 변환
    function calculateMousePosition(e) {
      mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
    }

    // 변환된 마우스 좌표를 이용해 래이캐스팅
    function raycasting() {
      raycaster.setFromCamera(mouse, camera);
      checkIntersects();
    }

    // 마우스 이벤트
    canvas.addEventListener('mousedown', (e) => {
      isPressed = true;
      calculateMousePosition(e);
    });
    canvas.addEventListener('mouseup', () => {
      isPressed = false;
    });
    canvas.addEventListener('mousemove', (e) => {
      if (isPressed) {
        calculateMousePosition(e);
      }
    });

    // 터치 이벤트
    canvas.addEventListener('touchstart', (e) => {
      isPressed = true;
      calculateMousePosition(e.touches[0]);
    });
    canvas.addEventListener('touchend', () => {
      isPressed = false;
    });
    canvas.addEventListener('touchmove', (e) => {
      if (isPressed) {
        calculateMousePosition(e.touches[0]);
      }
    });

    draw();
  }, []);

  return (
    <PositionDiv
      className="canvas_Wrap"
      style={{
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <ImgStyle
        src={phoneImg}
        alt="phone"
        onClick={() => {
          if (isPhone === false) {
            setIsPhone(true);
            navigate(`phone/home`);
          } else {
            setIsPhone(false);
            navigate(`/metassafy`);
          }
        }}
      />
      <canvas
        id="react-unity-webgl-canvas-1"
        className="meta-ssafy2"
        ref={canvasRef}
      ></canvas>
    </PositionDiv>
  );
}

export default MetaverseThree;

const PositionDiv = styled.div`
  position: absolute;
`;

const ImgStyle = styled.img`
  width: 4rem;
  height: 6rem;
  float: left;
  top: 80%;
  left: 85%;
  position: absolute;
  cursor: pointer;
`;
