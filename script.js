window.addEventListener('DOMContentLoaded', () => {
  const globo = Globe()
    (document.getElementById('globo-container'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .pointLabel(d => d.name)
    .pointsData([
      {
        name: '🇺🇸 EUA - Menlo Park',
        lat: 37.484440,
        lng: -122.147324
      },
      {
        name: '🇵🇹 Portugal - Guimarães',
        lat: 41.444657,
        lng: -8.296569
      },
      {
        name: '🇦🇪 Dubai - EAU',
        lat: 25.204986,
        lng: 55.270780
      }
    ])
    .customThreeObject(() => {
      const loader = new THREE.TextureLoader();
      const texture = loader.load('https://img.icons8.com/fluency/96/map-pin.png');

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
      });

      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12, 12, 1); // ajuste de tamanho visual

      return sprite;
    })
    .pointOfView({ lat: 20, lng: 0, altitude: 3.5 }, 1000);

  // Controles do globo
  globo.controls().autoRotate = true;
  globo.controls().autoRotateSpeed = 0.5;
  globo.controls().enableZoom = false;

  // Redesenha o globo após carregamento inicial
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);

  // Função para ir até um ponto específico
  window.irPara = function (nome) {
    const pontos = {
      '🇺🇸 EUA - Menlo Park': {
        lat: 37.484440,
        lng: -122.147324,
        streetView: 'https://www.google.com/maps?q=101+Jefferson+Dr,+Menlo+Park,+CA,+EUA&output=embed'
      },
      '🇵🇹 Portugal - Guimarães': {
        lat: 41.444657,
        lng: -8.296569,
        streetView: 'https://www.google.com/maps?q=Av.+São+Gonçalo,+Guimarães,+Portugal&output=embed'
      },
      '🇦🇪 Dubai - EAU': {
        lat: 25.204986,
        lng: 55.270780,
        streetView: 'https://www.google.com/maps?q=Boulevard+Plaza,+Tower+2,+Dubai&output=embed'
      }
    };

    const destino = pontos[nome];
    if (destino) {
      // Primeiro voo
      globo.pointOfView({
        lat: destino.lat,
        lng: destino.lng,
        altitude: 2.5
      }, 1000);

      // Aproximação
      setTimeout(() => {
        globo.pointOfView({
          lat: destino.lat,
          lng: destino.lng,
          altitude: 0.45
        }, 2000);
      }, 1000);

      // Parar rotação, mostrar mapa e remover fade
      setTimeout(() => {
        globo.controls().autoRotate = false;
        document.querySelector('.globo-card').classList.add('sem-fade');
        document.getElementById('maps-frame').src = destino.streetView;
        document.getElementById('maps-overlay').style.display = 'flex';
      }, 3200);
    }
  };

  // Função para fechar o mapa
  window.fecharMapa = function () {
    document.getElementById('maps-overlay').style.display = 'none';
    document.getElementById('maps-frame').src = '';
    globo.pointOfView({ lat: 20, lng: 0, altitude: 3.5 }, 1500);
    globo.controls().autoRotate = true;
    document.querySelector('.globo-card').classList.remove('sem-fade');
  };
});





document.addEventListener("DOMContentLoaded", () => {
  const imagens = document.querySelectorAll(".img-fade");
  let index = 0;

  setInterval(() => {
    imagens[index].classList.remove("ativo");

    index = (index + 1) % imagens.length;

    imagens[index].classList.add("ativo");
  }, 4000); // Troca a cada 4 segundos
});


function toggleMenu() {
  const nav = document.getElementById('navMobile');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}


let logoAtual = 0;

function trocarLogo(direcao) {
  const logos = document.querySelectorAll(".logo-item");
  
  logos[logoAtual].classList.remove("ativo");
  logoAtual = (logoAtual + direcao + logos.length) % logos.length;
  logos[logoAtual].classList.add("ativo");
}

