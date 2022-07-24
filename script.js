onload = function() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = '#005';
    let particles = [];
    
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    function randomColor() {
        return (Math.random() * 255) + 1;
    }
    class Particle {
        constructor(x, y, radius, color, direction) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.direction = direction;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        move() {
            this.y += this.direction.y;
            this.x += this.direction.x;
            if (this.x + this.radius > canvas.width) 
                this.direction.x -= Math.random();
            if (this.y < 0)
                this.direction.y = Math.random();
            if (this.x < 0)
                this.direction.x = Math.random();
            if (this.y + this.radius > canvas.height)
                this.direction.y -= Math.random();            
        }
        randomMove() {
            this.direction.x = randomIntFromRange(-5, 5);
            this.direction.y = randomIntFromRange(-5, 5);
        }
    }
    
    function createParticles() {
        for (let i = 0; i < 250; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const radius = (Math.random() * 2) + 1;
            const color = `rgba(${randomColor()}, ${randomColor()}, ${randomColor(),.5})`;
            const coordinates = {x: Math.random() < 0.5 ? -1 : 1, y: Math.random() < 0.5 ? - 1 : 1 }
            particles.push(new Particle(x, y, radius, color, coordinates));
        }
        if (particles.length === 250) {
            console.log(particles.length)
        }
    }

    createParticles();

    function animation() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        particles.forEach(particle =>{
            particle.draw();
            particle.move();
        })
        connect();
        requestAnimationFrame(animation);
    }
    animation();

    function connect() {
        let opacity = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let distance = ((particles[a].x - particles[b].x) *(particles[a].x - particles[b].x)) + ((particles[a].y - particles[b].y)*(particles[a].y - particles[b].y))
                if (distance < 1000) {
                    opacity = 1 - (distance /  10000);
                    ctx.strokeStyle = 'rgba(255, 255, 255,'+ opacity + ')';
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}