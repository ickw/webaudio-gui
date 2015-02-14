/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var targetId;
var userVolume = [];

 $(document).ready(function(){
  console.log("ready");
  document.getElementById("playBtn_1").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_1").addEventListener("mouseup", focused, false);
  document.getElementById("playBtn_2").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_2").addEventListener("mouseup", focused, false);
  document.getElementById("playBtn_3").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_3").addEventListener("mouseup", focused, false);
  document.getElementById("playBtn_4").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_4").addEventListener("mouseup", focused, false);
  document.getElementById("playBtn_5").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_5").addEventListener("mouseup", focused, false);
  document.getElementById("playBtn_6").addEventListener("mouseup", focused, false);
  document.getElementById("stopBtn_6").addEventListener("mouseup", focused, false);

  $('#stopBtn_1').hide();
  $('#stopBtn_2').hide();
  $('#stopBtn_3').hide();
  $('#stopBtn_4').hide();
  $('#stopBtn_5').hide();
  $('#stopBtn_6').hide();
 });

 function focused(e) {
  targetId = e.target.tabIndex; 
  targetName = e.target.id;
  console.log("focused on: " + targetName);

  switch(targetName) {
    case "stopBtn_1":
      $('#playBtn_1').show();
      $('#stopBtn_1').hide();
      break;
    case "playBtn_1":
      $('#playBtn_1').hide();
      $('#stopBtn_1').show();
      break;
    
    case "stopBtn_2":
      $('#playBtn_2').show();
      $('#stopBtn_2').hide();
      break;
    case "playBtn_2":
      $('#playBtn_2').hide();
      $('#stopBtn_2').show();
      break;

    case "stopBtn_3":
      $('#playBtn_3').show();
      $('#stopBtn_3').hide();
      break;
    case "playBtn_3":
      $('#playBtn_3').hide();
      $('#stopBtn_3').show();
      break;

    case "stopBtn_4":
      $('#playBtn_4').show();
      $('#stopBtn_4').hide();
      break;
    case "playBtn_4":
      $('#playBtn_4').hide();
      $('#stopBtn_4').show();
      break;

   case "stopBtn_5":
      $('#playBtn_5').show();
      $('#stopBtn_5').hide();
      break;
    case "playBtn_5":
      $('#playBtn_5').hide();
      $('#stopBtn_5').show();
      break;

    case "stopBtn_6":
      $('#playBtn_6').show();
      $('#stopBtn_6').hide();
      break;
    case "playBtn_6":
      $('#playBtn_6').hide();
      $('#stopBtn_6').show();
      break;

  }
 }

function VolumeSample(soundName) {
  var sn = 'http://daiki-ichikawa.sakura.ne.jp/webaudio-test/audio/' + soundName;
  console.log(sn);

  loadSounds(this, {
    buffer: sn
  });
  this.isPlaying = false;
};


VolumeSample.prototype.play = function(element) {

  console.log("playing : " + targetId);

  this.gainNode = context.createGain();
  this.source = context.createBufferSource();
  this.source.buffer = this.buffer;

  // Connect source to a gain node
  this.source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  // Start playback in a loop
  this.source.loop = true;
  // Reset Volume of selected player
  this.gainNode.gain.value = userVolume[targetId-1];
  // start play
  this.source[this.source.start ? 'start' : 'noteOn'](0);

  
};

VolumeSample.prototype.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;

  // save the volume of each players
  targetId = element.tabIndex;
  userVolume[targetId-1] = fraction * fraction;
};

VolumeSample.prototype.stop = function() {
  this.source[this.source.stop ? 'stop' : 'noteOff'](0);
};

VolumeSample.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
  // this.gainNode.gain.value = userVolume[targetId-1];
};