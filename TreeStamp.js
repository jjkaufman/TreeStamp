const TREE_HTML = `
<div id="tree">
  <div id="stump">
  </div>
  <div class="leafBall" id="leafBall0">
  </div>
  <div class="leafBall" id="leafBall1">
  </div>
  <div class="leafBall" id="leafBall2">
  </div>
  <div class="leafBall" id="leafBall3">
  </div>
  <div class="leafBall" id="leafBall4">
  </div>
  <div class="leafBall" id="leafBall5">
  </div>
  <div class="leafBall" id="leafBall6">
  </div>
  <div class="leafBall" id="leafBall7">
  </div>
  <!-- credit https://www.w3schools.com/howto/howto_css_shake_image.asp -->
  <link rel="stylesheet" type="text/css" href="data:text/css;charset=UTF-8,%40keyframes%20breezing-in-the-wind%20%7B%0A%20%200%25%20%7B%0A%20%20%20%20transform%3A%20translate(1px%2C%201px)%20rotate(0deg)%3B%0A%20%20%7D%0A%20%2010%25%20%7B%0A%20%20%20%20transform%3A%20translate(-1px%2C%20-2px)%20rotate(-1deg)%3B%0A%20%20%7D%0A%20%2020%25%20%7B%0A%20%20%20%20transform%3A%20translate(-3px%2C%200px)%20rotate(1deg)%3B%0A%20%20%7D%0A%20%2030%25%20%7B%0A%20%20%20%20transform%3A%20translate(3px%2C%202px)%20rotate(0deg)%3B%0A%20%20%7D%0A%20%2040%25%20%7B%0A%20%20%20%20transform%3A%20translate(1px%2C%20-1px)%20rotate(1deg)%3B%0A%20%20%7D%0A%20%2050%25%20%7B%0A%20%20%20%20transform%3A%20translate(-1px%2C%202px)%20rotate(-1deg)%3B%0A%20%20%7D%0A%20%2060%25%20%7B%0A%20%20%20%20transform%3A%20translate(-3px%2C%201px)%20rotate(0deg)%3B%0A%20%20%7D%0A%20%2070%25%20%7B%0A%20%20%20%20transform%3A%20translate(3px%2C%201px)%20rotate(-1deg)%3B%0A%20%20%7D%0A%20%2080%25%20%7B%0A%20%20%20%20transform%3A%20translate(-1px%2C%20-1px)%20rotate(1deg)%3B%0A%20%20%7D%0A%20%2090%25%20%7B%0A%20%20%20%20transform%3A%20translate(1px%2C%202px)%20rotate(0deg)%3B%0A%20%20%7D%0A%20%20100%25%20%7B%0A%20%20%20%20transform%3A%20translate(1px%2C%20-2px)%20rotate(-1deg)%3B%0A%20%20%7D%0A%7D" />
</div>
`;


class TreeStampUtils {
  /* credit https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro */
   textToHtml(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  random(max) {
    return (Math.random() * (max))
  }
}

class TreeStamp {
  constructor(x, y, size) {
    this.utils = new TreeStampUtils();
    this.MIN_GREEN = 75;
    this.MAX_GREEN = 250;
    this.MAX_BREEZE_DELAY = 2;
    this.name = 'Tree';
    this.x = x;
    this.y = y;
    this.z = y;
    this.size = size;
    this.id = Math.floor(Math.random()*10000000000);
    this.setup();
  }

  setup() {
    var html = TREE_HTML;
    html = html.replace('tree', 'tree' + this.id)
    html = html.replace('stump', 'stump' + this.id)
    for (var i = 0; i < 8; i++) {
      html = html.replace('leafBall' + i, 'leafBall' + i+''+ this.id)
    }
    this.el = this.utils.textToHtml(html)
    this.cssSetup();
  }

  cssSetup() {
    Object.assign(
      this.el.querySelector('#stump' + this.id).style, {
        position: 'absolute',
        width: this.scale(1 / 12) + 'px',
        height: this.scale(0.5555) + 'px',
        "background-color": 'brown',
        transform: 'perspective(' + this.scale(0.008888888, 1) + 'px) rotateX(' + this.scale(0.001666666, 1) + 'deg)',
        left: this.x + 'px',
        top: this.y + 'px',
        "box-shadow": '0px 0px 1px',
        "z-index": this.z
      }
    )

    var green = Math.floor(Math.random() * (this.MAX_GREEN - this.MIN_GREEN + 1)) + this.MIN_GREEN;
    this.leafBallCSS = {
      width: this.scale(0.444444) + 'px',
      height: this.scale(0.444444) + 'px',
      position: 'absolute',
      "background-color": 'rgb(0,' + green + ',0)',
      animation: 'breezing-in-the-wind 20s infinite',
      "z-index": this.z
    };

    this.applyLeafCss('#leafBall0' + this.id, 0.16666, 0.22222);
    this.applyLeafCss('#leafBall1' + this.id, 0.111111, 0.1666);
    this.applyLeafCss('#leafBall2' + this.id, 0.05555555, 0.111111);
    this.applyLeafCss('#leafBall3' + this.id, 0.111111, 0.05555555);
    this.applyLeafCss('#leafBall4' + this.id, 0.1666, 0);
    this.applyLeafCss('#leafBall5' + this.id, 0.222222, 0.05555555);
    this.applyLeafCss('#leafBall6' + this.id, 0.27777777, 0.111111);
    this.applyLeafCss('#leafBall7' + this.id, 0.222222, 0.1666);

  }

  applyLeafCss(id, left, top) {
    Object.assign(
      this.el.querySelector(id).style, this.leafCss(left, top)
    )
  }

  leafCss(left, top) {
    return Object.assign({}, this.leafBallCSS, {
      left: this.leftScale(left) + 'px',
      top: this.topScale(top) + 'px',
      "animation-delay": this.utils.random(this.MAX_BREEZE_DELAY) + 's'
    });
  }

  scale(percentage, round) {
    var ratio = this.size * percentage;
    if (round !== undefined) {
      return ratio;
    }
    return Math.round(ratio);
  }

  leftScale(val) {
    return (this.x - (this.size / 3)) + this.scale(val);
  }

  topScale(val) {
    return (this.y - (this.size / 2.3)) + this.scale(val);
  }

  draw() {
    document.body.appendChild(this.el);
  }

}
