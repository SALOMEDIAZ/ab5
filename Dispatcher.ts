type Action = {
    type: string;
    payload?: any;
};

type Callback = (action: Action) => void;

class Dispatcher {
    private callbacks: Callback[] = []; 

    register(callback: Callback) {
        this.callbacks.push(callback); 
    }

    dispatch(action: Action) {
        for (const cb of this.callbacks) {
            cb(action); 
        }
    }

    clear() {
        this.callbacks = []; 
    }
}

const dispatcher = new Dispatcher(); 
export default dispatcher; 
export type { Action };
