const A = 1;
const B = 2;
const C = 3;
const P = (i) => {
    switch (i){
        case A:
    }
};
const Q = (i) => {
    switch (i){
        case A:
    }
};
const PT = (i, s) => {
    switch (s){
        case A:
            return [
                s(i),
                PT(s)
            ]
    }
};

const pFactory = (state) => {
    if (!state){
        state = 0;
    }
    return (input) => {
        
        if (Number.isInteger(input)) {
            if (state + input <= 0) {
                return [, pFactory(0)];
            }
            return [, pFactory(state + input)];
        }
        const output = new Array(Math.max(0, state)).reduce((acc, _) => acc + '\t', '') + input;
        return [output, pFactory(state)];
    }
}

const p = pFactory(0);

const pFactory = function pFactory(state) {
    if (!state){
        state = 0;
    }
    return (input) => {
        
        if (Number.isInteger(input)) {
            if (state + input <= 0) {
                return [, pFactory(0)];
            }
            return [, pFactory(state + input)];
        }
        const output = new Array(Math.max(0, state)).reduce((acc, _) => acc + '\t', '') + input;
        return [output, pFactory(state)];
    }
}

const p2 = ((init) =>
    (function p2Factory(state) {
        if (!state){
            state = 0;
        }
        return (input) => {
            
            if (Number.isInteger(input)) {
                if (state + input <= 0) {
                    return [, p2Factory(0)];
                }
                return [, p2Factory(state + input)];
            }
            const output = new Array(Math.max(0, state)).reduce((acc, _) => acc + '\t', '') + input;
            return [output, p2Factory(state)];
        }
    })(init))(0);

