import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import '../assets/css/login.scss'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import * as THREE from 'three'
import Stats from '../assets/libs/three/stats.module.js';
import bgImg from '../assets/img/bg.jpg'

const sence = new THREE.Scene()
var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var container, stats;
var camera, scene, renderer;
var particles, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function init() {

  container = document.getElementsByClassName('login-page')[0];
  console.log(container)
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  //

  var numParticles = AMOUNTX * AMOUNTY;

  var positions = new Float32Array( numParticles * 3 );
  var scales = new Float32Array( numParticles );

  var i = 0, j = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
      positions[ i + 1 ] = 0; // y
      positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

      scales[ j ] = 1;

      i += 3;
      j ++;

    }

  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
  geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

  var material = new THREE.ShaderMaterial( {

    uniforms: {
      color: { value: new THREE.Color( 0xc87be4 ) },
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent

  } );

  //

  particles = new THREE.Points( geometry, material );
  scene.add( particles );

  //

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // stats = new Stats();
  // container.appendChild( stats.dom );

  const loader = new THREE.TextureLoader();
  const bgTexture = loader.load(bgImg);
  scene.background = bgTexture;


  //

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}
function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}
function onDocumentTouchStart( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}
function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}
function animate() {

  requestAnimationFrame( animate );

  render();
  // stats.update();

}
function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  // camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.position.y = 300; // y轴方向不改变粒子动画
  // camera.lookAt(scene.positon) // scene.position的默认是new THREE.Vector3(0,0,0)
  camera.lookAt(0, 500, 0);

  var positions = particles.geometry.attributes.position.array;
  var scales = particles.geometry.attributes.scale.array;

  var i = 0, j = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
              ( Math.sin( ( iy + count ) * 0.5 ) * 50 );

      scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 8 +
              ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 8;

      i += 3;
      j ++;

    }

  }

  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.scale.needsUpdate = true;

  renderer.render( scene, camera );

  count += 0.02;

}
function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    init()
    animate()
  }, [])
  const checkLogin=() => {
    setIsLoading(true)
    
    if (!userName) {
      message.error('用户名不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return false
    } else if(!password) {
      message.error('密码不能为空')
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return false
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res)=>{
      setIsLoading(false)
      if(res.data.data === '登陆成功') {
        localStorage.setItem('openId', res.data.openId)
        props.history.push('/index')
      } else {
        message.error('用户名密码错误')
      }
    })
    
  }
  return (
    <div className="login-page">
      <div className="login-div">
        <Spin tip="loading..." spinning={isLoading}>
          <Card title="blog system" bordered={true} style={{width:400}}>
            <Input
              id="userName"
              size="large"
              placeholder="enter your username"
              prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            />
            <br/>
            <br/>
            <Input.Password
              id="password"
              size="large"
              placeholder="enter your password"
              prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <br/>
            <br/>
            <Button type="primary" size="large" block onClick={ checkLogin }>Login in</Button>
          </Card>
        </Spin>
      </div>
    </div>
  )
}

export default Login