var ACTIVE_SHADER = 10;
var N_SCREENS = 10;





function createScreens() {
  W = 640*0.5;
  H = 480*0.5;

  for (var i=0; i<N_SCREENS; i++) {

     var jj = i%(N_SCREENS/2);
     var ii = Math.floor(i*2/N_SCREENS);

      var offsetX = ii*1.1*W;
      var screen = new Screen (offsetX, jj*H*1.1, W, H);
      for (s of SHADER_LIST) {
        screen.addShader(s);
      }
      screen.addUniform("uTime");
      screen.addUniform("uI");
      screen.addUniform("uJ");
      screen.addUniform("uW", W);
      screen.addUniform("uH", H);
      screen.addUniform("uX0", offsetX);
      screen.addUniform("uY0", jj*H*1.05);
      screen.addUniform("uTiles", 0);
      screens.push(screen);
  }
}


function cmp(x,y) {
  if (x>y) return 0;
  return 1;
}

function Controller() {

  this.time = 0;
  this.N_SHADERS = SHADER_LIST.length;
  this.shaders = [];
  for (var i=0; i<N_SCREENS; i++) {
    this.shaders.push(i);
  }
}

Controller.prototype.update = function(dt) {
  for (var i=0; i<N_SCREENS; i++) {
      screens[i].activateShader(this.shaders[i]);
      screens[i].uTiles = 0;
      screens[i].activateShader(ACTIVE_SHADER);
    }
  this.time += dt;
}


var screens = [];
var controller = new Controller();
var time = 0;
var lastTime = 0;

function animate() {

  var dt = 0;
  var timeNow = new Date().getTime();
  if (lastTime != 0) {
    dt = (timeNow - lastTime) / 1000.;
  }
  lastTime = timeNow;

  controller.update(dt);

  for (var i=0; i<N_SCREENS; i++) {
    var screen = screens[i];
      screen.uTime = time;
      screen.uI = i%4;
      screen.uJ = Math.floor(i/4);
      // screen.uTiles = Math.round(Math.sin(time+i));
      screen.draw();
    }

  time += dt
  requestAnimationFrame(animate);
 }

 window.onload = function() {

   createScreens();
   animate();
 }
