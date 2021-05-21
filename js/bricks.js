function drawIt() {
    var canvas = document.getElementById('igra');
    var ctx = canvas.getContext('2d');
    var sirinaCan = canvas.width;
    var visinaCan = canvas.height;
    var right = false;
    var left = false;
    var sirina = 100;
    var visina = 11;
    var x2 = sirinaCan / 2 - sirina / 2;
    var dx2 = 6;

    var r = 10;
    var x;
    var y;
    var dx = 0;
    var dy = -4;
    var vrsta = 4;
    var stolpec = 12;
    var padding = 5.5;
    var brickHeight = 20;
    var brickhWidth = sirinaCan / stolpec + padding;
    var bricks = new Array(vrsta);
    var i;
    var j;

    var sekundeI;
    var minuteI;
    var sekunde = 0;
    var izpisTimer = "00:00";
    var intervalTimer;
    var time = false;

    var x = 0;
    var score = 0;
    var up = true;
    var life = 3;
    var refreshInterval;
    var rowheight = brickHeight + padding * 2;
    var colwidth = brickhWidth + padding;

    for (i = 0; i < vrsta; i++) {
        bricks[i] = new Array(stolpec);
        for (j = 0; j < stolpec; j++) {
            bricks[i][j] = 1;
        }
    }

    function timer() {
        if (time) {
            sekunde++;
            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;
        }
        cas.innerHTML = "Time: " + izpisTimer;
    }

    function reset() {
        time = false;
        izpisTimer = "00:00";
        sekunde=0;
        score = 0;
        life = 3;
        up = true;
        x2 = sirinaCan / 2 - sirina / 2;
        x = x2 + sirina / 2 - r / 2;
        y = visinaCan - visina - r - 2;
        for (i = 0; i < vrsta; i++) {
            bricks[i] = new Array(stolpec);
            for (j = 0; j < stolpec; j++) {
                bricks[i][j] = 1;
            }
        }
    }

    function draw() {
        switch (life) {
            case 0:
                lifeP.innerHTML = "Life: " + life;
                reset();
                break;
            case 1:
                lifeP.innerHTML = "Life: " + life;
                break;
            case 2:
                lifeP.innerHTML = "Life: " + life;
                break;
            case 3:
                lifeP.innerHTML = "Life: " + life;
                break;
            default:
                break;
        }

        if (up) {
            x = x2 + sirina / 2 - r / 2;
            y = visinaCan - visina - r - 2;
        }
        ctx.fillStyle = "#FFF";
        ctx.clearRect(0, 0, sirinaCan, visinaCan);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.rect(x2, visinaCan - visina, sirina, visina);
        ctx.closePath();
        ctx.fill();

        point.innerHTML = "Score: " + score;

        for (i = 0; i < bricks.length; i++) {
            for (j = 0; j < bricks[i].length - 2; j++) {
                if (bricks[i][j] != 0) {
                    ctx.fillStyle = "#FFF";
                    ctx.beginPath();
                    ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }

    function move() {
        draw();

        if (life > 0) {
            if (y <= 0 + r)
                dy = dy * (-1);
            else if (x >= sirinaCan - r || x <= 0 + r) {
                if (x < 0 + r - dx) {
                    x = 0 + r;
                }
                else if (x > sirinaCan - r + dx) {
                    x = sirinaCan - r;
                }
                dx = dx * (-1);
            }
            else if (y > visinaCan - r) {
                life--;
                dy = dy * (-1);
            }
        }

        document.addEventListener('keydown', function (event) {
            if (event.keyCode == 37) {
                left = true;
            } else if (event.keyCode == 39) {
                right = true;
            } else if (event.keyCode == 38 && up) {
                up = false;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.keyCode == 37)
                left = false;
            else if (event.keyCode == 39)
                right = false;
        });
        if (right && x2 < sirinaCan - sirina)
            x2 = x2 + dx2;
        else if (left && x2 > 0)
            x2 = x2 - dx2;

        if (x - r >= x2 && x <= x2 + sirina && y >= visinaCan - visina - r && y < visinaCan) {
            dx = 8 * ((x - (x2 + sirina / 2)) / sirina);
            dy = -dy;
        }

        i = Math.floor(y / rowheight);
        j = Math.floor(x / colwidth);
        if (y <= vrsta * rowheight && i >= 0 && j >= 0 && bricks[i][j] > 0) {
            dy = -dy;
            bricks[i][j] = bricks[i][j] - 1;
            score++;
        }

        if (up) { } else {
            time = true;
            x += dx;
            y += dy;
        }
    }
    intervalTimer = setInterval(timer, 1000);
    refreshInterval = setInterval(move, 10);
}