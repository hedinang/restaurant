import React, { useEffect, useRef } from 'react';
let mouse = {
    x: 0,
    y: 0
}
class Circle {
    x
    y
    dx
    dy
    radius = 1
    c
    w
    h
    color
    maxRadius = 10
    constructor(x, y, dx, dy, radius, ctx, w, h, color) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        // this.radius = radius
        this.c = ctx
        this.w = w
        this.h = h
        this.color = color
    }
    update() {
        if (this.x + this.radius > this.w || this.x - this.radius < 0)
            this.dx = -this.dx
        if (this.y + this.radius > this.h || this.y - this.radius < 0)
            this.dy = -this.dy
        this.x += this.dx
        this.y += this.dy
        let map = new Map()

        if (this.x > mouse.x - 150 && this.x < mouse.x + 150 && this.y > mouse.y - 150 && this.y < mouse.y + 150)
        // this.radius = 14
        {
            map.set('x', this.x)
            map.set('y', this.y)
        }
        // else
        this.draw()
        return map
        // this.radius = 1
        // this.draw()
    }
    draw() {
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI / 2, false)
        this.c.strokeStyle = 'white'
        this.c.stroke()
        this.c.fillStyle = 'white'
        this.c.fill()
        // this.c.clearRect(0, 0, window.innerWidth, 1000)
    }

}
function printLine(text, width, fontSize) {
    const maxLength = Math.floor(3 * width / 4)
    const maxLetter = Math.floor(maxLength / fontSize)
    const chunks = text.match(/\b[\w\s]{75,}?(?=\s)|.+$/g)
    // const chunks = text.match(new RegExp('.{1,' + maxLetter + '}', 'g'));
    return chunks
}

export function Animation() {
    let ref = useRef(null);
    let ctx
    let circleList = []
    let N = 120
    let colorList = ['#ed1a1a', '#31ed1a', '#1a20ed', '#d0e714']
    function randomIntFromTo(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    let animate = () => {
        let connections = []
        ctx.clearRect(0, 0, window.innerWidth, 700)
        for (let index = 0; index < N; index++) {
            let interaction = circleList[index].update()
            if (interaction.size !== 0)
                connections.push(interaction)
        }
        for (let index = 0; index < connections.length; index++) {
            let queueElement = connections.shift()
            for (let i = 0; i < connections.length; i++) {
                const element = connections[i]
                ctx.beginPath()
                ctx.lineWidth = 0.2
                ctx.moveTo(queueElement.get('x'), queueElement.get('y'))
                ctx.lineTo(element.get('x'), element.get('y'))
                ctx.strokeStyle = 'white'
                ctx.stroke()
            }
        }
        const sentenceList = [
            'We provide consultant service about digital transformation and software solution ' +
            'in finance, medical, retail sector for domestic and international companies',
            'With the want is to contribute to lift the reputation of Vietnam on the world technology map ' +
            'MIRACLE SOFTWARE aims to bring the new technology to the life by leveraging techonology workforce in Vietnam ' +
            'and the view becomes the top company in Southeast Asia'
        ]
        ctx.font = "bold 30px serif";
        ctx.fillText('We are top software partner in Vietnam', window.innerWidth / 6, 150);
        let verticalStart = 200
        ctx.font = "italic 20px serif";
        sentenceList.forEach(f => {
            printLine(f, window.innerWidth, 20).forEach(e => {
                ctx.fillText(e, window.innerWidth / 6, verticalStart)
                verticalStart += 30
            });
        });
        requestAnimationFrame(animate)
    }
    let mouseMove = (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }
    useEffect(() => {
        if (ref.current) {
            let canvas = ref.current
            canvas.width = window.innerWidth
            canvas.height = 500
            ctx = canvas.getContext('2d')
            if (ctx) {
                for (let index = 0; index < N; index++) {
                    let x = Math.random() * window.innerWidth
                    let y = Math.random() * canvas.height
                    let dx = Math.random() - 0.5
                    let dy = Math.random() - 0.5
                    let color = colorList[randomIntFromTo(0, 3)]
                    circleList.push(new Circle(x, y, dx, dy, 4, ctx, window.innerWidth, 200, color))
                }
                animate()

            }
        }
    }, [ref])
    return (
        <canvas style={{ backgroundColor: '#002a56', width: '100%' }} onMouseMove={mouseMove} ref={ref}></canvas>
    )
}