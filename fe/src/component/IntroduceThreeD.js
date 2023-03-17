import React, { MouseEvent, useEffect, useRef, useState } from 'react';
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

        if (this.x > mouse.x - 200 && this.x < mouse.x + 200 && this.y > mouse.y - 200 && this.y < mouse.y + 200)
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
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.c.strokeStyle = 'white'
        this.c.stroke()
        this.c.fillStyle = 'white'
        this.c.fill()
        // this.c.clearRect(0, 0, window.innerWidth, 1000)
    }

}

function IntroduceThreeDesktop(props) {
    let ref = useRef(null);
    let ctx
    let circleList = []
    let N = 70
    let heigh = 400
    let colorList = ['#ed1a1a', '#31ed1a', '#1a20ed', '#d0e714']
    const text =
        'We provide consultant service about digital transformation and software solution ' +
        'in finance, medical, retail sector for domestic and international companies. ' +
        'With the want is to contribute to lift the reputation of Vietnam on the world technology map ' +
        'MIRACLE SOFTWARE aims to bring the new technology to the life by leveraging techonology workforce in Vietnam ' +
        'and the view becomes the top company in Southeast Asia'
    let splits = text.split(' ')
    let lines = []
    let fontSize = 17
    let maxLineLength = 1200
    let start = -1
    let seperate = () => {
        let line = ''
        let lineLength = 0
        while (lineLength <= maxLineLength && start < splits.length - 1) {
            start += 1
            line += ' ' + splits[start]
            lineLength += fontSize * (splits[start].split('').length + 1)
        }
        lines.push(line)
        if (start < splits.length - 1)
            seperate()
    }
    seperate()

    function randomIntFromTo(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let animate = () => {
        let connections = []
        ctx.clearRect(0, 0, window.innerWidth, heigh)
        for (let index = 0; index < N; index++) {
            let interaction = circleList[index].update()
            if (interaction.size !== 0)
                connections.push(interaction)
        }
        ctx.lineWidth = 0.1
        for (let index = 0; index < connections.length; index++) {
            let queueElement = connections.shift()
            for (let i = 0; i < connections.length; i++) {
                const element = connections[i]
                ctx.beginPath()
                ctx.moveTo(queueElement.get('x'), queueElement.get('y'))
                ctx.lineTo(element.get('x'), element.get('y'))
                ctx.strokeStyle = 'white'
                ctx.stroke()
            }
        }
        var lineheight = 25;
        let x = window.innerWidth / 7
        let y = 120
        ctx.fillStyle = "white";
        ctx.font = "27pt Times New Roman";
        ctx.fillText('We are top software partner in Vietnam', x, y)
        y = y + 35
        ctx.font = '17px Font name';
        for (var i = 0; i < lines.length; i++)
            ctx.fillText(lines[i], x, y + (i * lineheight));
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
            canvas.height = heigh
            ctx = canvas.getContext('2d')
            if (ctx != null) {
                for (let index = 0; index < N; index++) {
                    let x = Math.random() * window.innerWidth
                    let y = Math.random() * canvas.height
                    let dx = Math.random() - 0.5
                    let dy = Math.random() - 0.5
                    let color = colorList[randomIntFromTo(0, 3)]
                    circleList.push(new Circle(x, y, dx, dy, 4, ctx, window.innerWidth, heigh, color))
                }
                animate()

            }
        }
    }, [props])
    return (
        <canvas className='intro-desktop' onMouseMove={mouseMove} ref={ref}></canvas>
    )
}
function IntroduceThreeMobile(props) {
    let ref = useRef(null);
    let ctx
    let circleList = []
    let N = 70
    let heigh = 400
    let colorList = ['#ed1a1a', '#31ed1a', '#1a20ed', '#d0e714']
    const text =
        'We provide consultant service about digital transformation and software solution ' +
        'in finance, medical, retail sector for domestic and international companies. ' +
        'With the want is to contribute to lift the reputation of Vietnam on the world technology map ' +
        'MIRACLE SOFTWARE aims to bring the new technology to the life by leveraging techonology workforce in Vietnam ' +
        'and the view becomes the top company in Southeast Asia'
    let splits = text.split(' ')
    let lines = []
    let fontSize = 17
    let start = -1
    let seperate = (maxLineLength) => {
        let line = ''
        let lineLength = 0
        while (lineLength <= maxLineLength && start < splits.length - 1) {
            start += 1
            line += ' ' + splits[start]
            lineLength += fontSize * (splits[start].split('').length + 1)
        }
        lines.push(line)
        if (start < splits.length - 1)
            seperate(maxLineLength)
    }

    function randomIntFromTo(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let animate = () => {
        let connections = []
        ctx.clearRect(0, 0, window.innerWidth, heigh)
        for (let index = 0; index < N; index++) {
            let interaction = circleList[index].update()
            if (interaction.size !== 0)
                connections.push(interaction)
        }
        ctx.lineWidth = 0.1
        for (let index = 0; index < connections.length; index++) {
            let queueElement = connections.shift()
            for (let i = 0; i < connections.length; i++) {
                const element = connections[i]
                ctx.beginPath()
                ctx.moveTo(queueElement.get('x'), queueElement.get('y'))
                ctx.lineTo(element.get('x'), element.get('y'))
                ctx.strokeStyle = 'white'
                ctx.stroke()
            }
        }
        var lineHeight = 20;
        let x = window.innerWidth / 2
        let y = 90
        ctx.textAlign = 'center'
        ctx.fillStyle = "white";
        ctx.font = "30pt Times New Roman";
        // ctx.fillText('We are top software partner in Vietnam', x, y)
        // y = y + lineHeight
        ctx.font = '17px Font name';
        for (var i = 0; i < lines.length; i++)
            ctx.fillText(lines[i], x, y + (i * lineHeight));
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
            canvas.height = heigh
            ctx = canvas.getContext('2d')
            seperate(props.longestLine)

            if (ctx != null) {
                for (let index = 0; index < N; index++) {
                    let x = Math.random() * window.innerWidth
                    let y = Math.random() * canvas.height
                    let dx = Math.random() - 0.5
                    let dy = Math.random() - 0.5
                    let color = colorList[randomIntFromTo(0, 3)]
                    circleList.push(new Circle(x, y, dx, dy, 4, ctx, window.innerWidth, heigh, color))
                }
                animate()

            }
        }
    }, [props])
    return (

        <canvas className='intro-mobile' onMouseMove={mouseMove} ref={ref}></canvas>

    )
}
export {
    IntroduceThreeDesktop, IntroduceThreeMobile
}