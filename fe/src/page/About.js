import { useState } from "react"
import { throttle, debounce } from 'rxjs/operators'
import { Observable } from 'rxjs';

const ttt = () => {
    const observable = new Observable((subscriber) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
        }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
        next(x) {
            console.log('got value ' + x);
        },
        error(err) {
            console.error('something wrong occurred: ' + err);
        },
        complete() {
            console.log('done');
        },
    });
    console.log('just after subscribe');
}


export default function About() {
    const [outcome, setOutcome] = useState('ss')
    return <>
        <div style={{ width: '100%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '100px' }}>
            <div>
                <div>Type in here</div>
                {/* <input onClick={ } /> */}
                <button onClick={() => {
                    ttt()
                }}>click me to handle the obstacle</button>
            </div>
            <div>
                <div>Outcome</div>
                <div>{outcome}</div>
            </div>
        </div>
    </>

}