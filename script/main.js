var guhui = function() {
	this.sele = document.getElementById('slider').getElementsByClassName('slides');
	this.current = 0;
	// this.createMain();
	this.sliderPage(window, window.document);

};



guhui.prototype.getSlider = function(i) {
	return this.sele[i];
};

guhui.prototype.timer = function() {
	var startTime = new Date(2015,5,8).getTime();
	var endTime = new Date().getTime();
	var day = Math.ceil((endTime - startTime)/1000/3600/24);
	return day;
};

guhui.prototype.draw = function() {
	var insert = [];
	insert.push('<h3>观点IT部实习生QAQ</h3>');
	insert.push('<p>大家好，我是古文晖<br/>可以叫我骨灰</p>');
	this.getSlider(0).innerHTML = insert.join('');

	insert = [];
	insert.push('<p>6月8日是我来到观点实习的第一天<br/>距离现在有' + this.timer() + '天了</p>');
	this.getSlider(1).innerHTML = insert.join('');

	insert = [];
	insert.push('<p>从博鳌回来</p>');


};

guhui.prototype.sliderPage = function(window, document) {
	var that = this;
	document.addEventListener('DOMContentLoaded', function () {
    var slider          = document.getElementById('slider'),
        sliderWrapper   = slider.children.item(0),
        screenHeight    = window.innerHeight,
        slides          = document.querySelectorAll('#slider .slides'),
        slidesNumber    = slides.length,
        limit           = slidesNumber - 1,
        isTransitionEnd = true;
      	

    slider.style.height = screenHeight + 'px';
    window.addEventListener('resize', function (event) {
      screenHeight = window.innerHeight;
      slider.style.height = screenHeight + 'px';
      limit = (1 - slidesNumber) * screenHeight;
      setStylesTransform();
    }, false);

    function addEventHandler(target, typeArray, handler, isCaptured) {
      var self = target;
      typeArray.split(' ').forEach(function (currentValue, index, array) {
        self.addEventListener(currentValue, handler, isCaptured);
      });
    }

    addEventHandler(sliderWrapper, 'transitionend webkitTransitionEnd', function (event) {
      isTransitionEnd = true;
    }, false);
    
    function setStylesTransform() {
      var styles = ['transform', '-webkit-transform', '-moz-transform', '-ms-transition'];
      for (var i = 0; i < styles.length; i++)
        sliderWrapper.style[styles[i]] = 'translate3d(0px, -' + (that.current * screenHeight) + 'px, 0px)';

      that.callBack();
    }
    function applyCorrect(direction){
      // if sliderWapper's transition is still running, return to prevent continue scrolling
      if (!isTransitionEnd) {
        return;
      }
      switch (direction) {
        case 'up' :
          if (that.current === 0) {return;}
          that.current--;
          break;
        case 'down' :
          if (that.current === limit) {return;}
          that.current++;
          break;
      }
      isTransitionEnd = false;
      setStylesTransform();
    }

    slider.addEventListener('mousewheel', function (event) {
      var self       = that,
          wheelDelta = event.wheelDeltaY,
          direction  = wheelDelta > 0 ? 'up' : 'down';
      applyCorrect(direction);
    }, false);
    var touchStartPoint;
    var touchId = null;
    slider.addEventListener('touchstart', function(evt){
      evt = evt || window.event;
      if(evt.touches.length == 1) {
        var tt = evt.touches[0];
        touchId = tt.identifier || null;
        touchStartPoint = tt.clientY;
      }
    }, false);
    slider.addEventListener('touchmove', function(evt){
      evt = evt || window.event;
      if((!evt.touches.identifiedTouch) || touchId !== null) {
        var tt = (evt.touches.identifiedTouch?evt.touches.identifiedTouch(touchId):evt.touches[0]);
        if(tt) {
            if(Math.abs(tt.clientY - touchStartPoint) > screenHeight*0.4){
              var dir = (tt.clientY<touchStartPoint?'down':'up');
              applyCorrect(dir);
              touchId = null;
            }
        }		
      }
    }, false);
  }, false);
};

guhui.prototype.callBack = function() {
	var that = this;
	for(var i=0; i<this.sele.length; i++) {
		if((/\s*active\s*/).test(this.sele[i].className)) {
			this.sele[i].className = this.sele[i].className.replace(/\s*active/,' ');
		}
		this.sele[i].className = 'slides';
		if(this.sele[i].getElementsByTagName('h3').length !== 0) {
			this.sele[i].getElementsByTagName('h3')[0].className = 'hide';
		}
		if(this.sele[i].getElementsByTagName('p').length !== 0) {
			this.sele[i].getElementsByTagName('p')[0].className = 'hide';
		}
	}
	this.sele[this.current].className += ' active';
	setTimeout(function() {
		if(that.sele[that.current].getElementsByTagName('h3').length !== 0) {
			that.sele[that.current].getElementsByTagName('h3')[0].className = ' animated fadeInDown';
		}
		if(that.sele[that.current].getElementsByTagName('p').length !== 0) {
			that.sele[that.current].getElementsByTagName('p')[0].className = ' animated zoomInDown';
		}
	},500);
};//回调添加active，触发回调函数 h3 p 各一动画



(function(){
	var main = new guhui();
	main.draw();
	main.callBack();
	var music = document.getElementById('myaudio');
	music.src = '1.mp3';
	music.play();
}())