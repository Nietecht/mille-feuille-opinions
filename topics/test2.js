// P: (Integer | any) => string | P
const p = (function pFactory(state) {
        if (!state){
            state = 0;
        }
        return (input) => {
            if (Number.isInteger(input)) {
                if (state + input <= 0) {
                    return pFactory(0);
                }
                return pFactory(state + input);
            }
            return new Array(Math.max(0, state)).reduce((acc, _) => acc + '\t', '') + input.toString();
        }
    }());

const q = (function () {
    function q1Factory(state) {
        (input) => {
            if (input < state){
                return q1Factory(state+1);
            } else {
                return q2Factory(state-1);
            }
        };
    };
    function q2Factory(state) {
        (input) => {
            if (input > state){
                return q2Factory(state+1);
            } else {
                return q1Factory(state-1);
            }
        };
    };
    return q1Factory(0);
}());