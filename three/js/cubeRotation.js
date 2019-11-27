'use strict'

// サイズ設定
const width = window.innerWidth;
const height = window.innerHeight - 200;


let isRotateX = false;
let isRotateY = false;
let isRotateZ = false;

const xrotateElement = document.getElementById('xrotate');
xrotateElement.onclick = function() {
  isRotateX = !isRotateX;
}
const yrotateElement = document.getElementById('yrotate');
yrotateElement.onclick = function() {
  isRotateY = !isRotateY;
}
const zrotateElement = document.getElementById('zrotate');
zrotateElement.onclick = function() {
  isRotateZ = !isRotateZ;
}

document.getElementById('white-bg').onclick = function() {
  scene.background = new THREE.Color(0xFFFFFF);
}
document.getElementById('black-bg').onclick = function() {
  scene.background = new THREE.Color(0x000000);
}
document.getElementById('green-bg').onclick = function() {
  scene.background = new THREE.Color(0x00FF00);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const controls = new THREE.OrbitControls(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#myCanvas'),
});
renderer.setSize(width, height);

// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
scene.add(ambientLight);

// Collada 形式のモデルデータを読み込む
const loader = new THREE.ColladaLoader();
// dae ファイルのパスを指定
let model;
loader.load('models/dae/untitled.dae', (collada) => {
  model = collada.scene;
  model.rotation.x += getRadian(30);
  model.rotation.y += getRadian(-15);
  scene.add(model); // 読み込み後に3D空間に追加
});

function getRadian(kakudo) {
    return kakudo * Math.PI / 180;
}
  

var animate = function animate() {
  if (model) {
    if (isRotateX) {
      model.rotation.x += getRadian(1);
    }
    if (isRotateY) {
      model.rotation.y += getRadian(1);
    }
    if (isRotateZ) {
      model.rotation.z += getRadian(1);
    }
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();