let clocation = document.querySelector('#locate-me');

if ('geolocation' in navigator) {
  navigator.geolocation.watchPosition(
    (postion) => {
      clocation.innerHTML = `<p class="text-black">Your current postion is:<br/> latitude:${postion.coords.latitude}&deg; <br/> longitude:${postion.coords.longitude}&deg;</p>`;
    },
    (err) => {
      console.log(err);
    }
  );
} else {
  console.log('none');
}
