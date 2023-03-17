import { useEffect, useState } from "react"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { interval } from "rxjs";

const SlideShow = ({ contentList }) => {
    const [content, setContent] = useState(0)
    const prevClick = () => {
        if (content === 0) {
            setContent(contentList.length - 1)
        } else {
            setContent(content - 1)
        }
    }
    const nextClick = () => {
        if (content === contentList.length - 1) {
            setContent(0)
        } else {
            setContent(content + 1)
        }
    }
    return <div className="slide-show">
        <LeftOutlined className="move-button" onClick={prevClick} />
        <img src={contentList[content]} />
        <RightOutlined className="move-button" onClick={nextClick} />
    </div>

}
const SlideAuto = ({ contentList, numOfItem, className }) => {
    const [queue, setQueue] = useState([])
    const [last, setLast] = useState(numOfItem - 1)
    useEffect(() => {
        setQueue([...contentList.slice(0, numOfItem)])
    }, [])
    useEffect(() => {
        const timer = interval(2000).subscribe(() => {
            const tmp = (last === contentList.length - 1) ? 0 : last + 1
            queue.push(contentList[tmp])
            queue.shift()
            setQueue([...queue])
            setLast(tmp)
        })
        return () => timer.unsubscribe();

    }, [queue])
    const jump2Page = (url) => {
        if (url)
            window.open(url);
    }
    return <div className={`slide-auto ${className}`} >
        {queue.map(e => <img src={e.img} onClick={() => jump2Page(e.url)} />)}
    </div>

}

export {
    SlideShow,
    SlideAuto
}