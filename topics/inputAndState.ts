type xs<T> = [T];
type Content<T> = T extends xs<infer U> ? U : never
type Case<TCaseValue extends string, T, TCase extends string = 'case'> = T extends { [key in TCase]: TCaseValue } ? T : never;
const DEFAULT = Symbol();
type DEFAULT = typeof DEFAULT;
const STATE = Symbol();
type STATE = typeof STATE;
const OUTPUT = Symbol();
type OUTPUT = typeof OUTPUT;
type Output<T> = { [STATE]: T, [OUTPUT]?: any } | T;
const IGNORE = Symbol();
type IGNORE = typeof IGNORE;
const INIT = Symbol();
type INIT = typeof INIT;

type IntentHandler<Intent, CaseState, State> = ((intent: Intent, state: CaseState) => Output<State>) | IGNORE

// example-types
type MyStateA = {
  case: "StateCaseA",
  dataForStateCaseA: string
}
​
type MyStateB = {
  case: "StateCaseB",
  dataForStateCaseB: string
}
​
type MyStateC = {
  case: "StateCaseC",
  dataForStateCaseC: string
}
​
type MyState = MyStateA | MyStateB | MyStateC
​
type MyIntent = {
  inputA: xs<string>;
  inputB: xs<number>;
  inputX: xs<boolean>;
}
​
const handlerForX = (intent: boolean, state: MyStateA | MyStateB) => state;
// end-of-example-types

namespace intentFirst {
​  namespace initAsIntent {

    type FullIntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> = {
      [stateCase in State[TCase]]: IntentHandler<Intent, Case<stateCase, State, TCase>, State>
    };
    ​
    type IntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> =
      FullIntentHandlers<Intent, State, TCase>
        | (
          Partial<FullIntentHandlers<Intent, State, TCase>>
            & { [DEFAULT]: IntentHandler<Intent, State, State> }
        );
    ​
    type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
      [keyIntent in keyof Intent]: IntentHandlers<Content<Intent[keyIntent]>, State, TCase>
    } & {
      [INIT]:(() => Output<State>) | IGNORE
    };

    const myDeclaration: Declaration<MyIntent, MyState> = {
      [INIT]: () => ({case: "StateCaseA", dataForStateCaseA: "test"}),
      inputA: {
        StateCaseA: (intent, state) => state,
        [DEFAULT]: IGNORE
      },
      inputB: {
        StateCaseB: (intent, state) => state,
        [DEFAULT]: IGNORE
      },
      inputX: {
        StateCaseA: handlerForX,
        StateCaseB: handlerForX,
        [DEFAULT]: IGNORE,
      }
    };
  }

  namespace initAsIntentHandler {

    type FullIntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> = {
      [stateCase in State[TCase]]: IntentHandler<Intent, Case<stateCase, State, TCase>, State>
    } & {
      [INIT]:((intent: Intent) => Output<State>) | IGNORE
    };
    ​
    type IntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> =
      FullIntentHandlers<Intent, State, TCase>
        | (
          Partial<FullIntentHandlers<Intent, State, TCase>>
            & { [DEFAULT]: IntentHandler<Intent, State, State> }
        )
    ​
    type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
        [keyIntent in keyof Intent]: IntentHandlers<Content<Intent[keyIntent]>, State, TCase>
    }

    /// Declaration from input to handled in state as _func_​
    const myDeclaration: Declaration<MyIntent, MyState> = {
      inputA: {
        StateCaseA: (intent, state) => state,
        [DEFAULT]: IGNORE
      },
      inputB: {
        StateCaseB: (intent, state) => state,
        [DEFAULT]: IGNORE
      },
      inputX: {
        [INIT]: (intent) => intent ? ({case: "StateCaseA", dataForStateCaseA: "test"}) : ({case: "StateCaseB", dataForStateCaseB: "thing"}),
        StateCaseA: handlerForX,
        StateCaseB: handlerForX,
        [DEFAULT]: IGNORE,
      }
    };
  }
}

namespace intentLast {
  namespace initAsIntent {

    type FullIntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> = {
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    };
    ​
    type IntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> =
      FullIntentHandlers<Intent, stateCase, State, TCase>
        | (
          Partial<FullIntentHandlers<Intent, stateCase, State, TCase>>
            & { [DEFAULT]: IntentHandler<Intent, State, State> }
        )
    ​
    type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
      [stateCase in State[TCase]]: IntentHandlers<Intent, stateCase, State, TCase>
    } & {
      [INIT]:(() => Output<State>) | IGNORE
    }

    const myDeclaration: Declaration<MyIntent, MyState> = {
      StateCaseA: {
        inputA: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseB: {
        inputB: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseC: {
        [DEFAULT]: IGNORE
      },
      [INIT]: () => ({ case: "StateCaseA", dataForStateCaseA: "lol" })
    }
  }

  namespace initAsIntentHandler {

    type FullIntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> = {
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    };
    ​
    type IntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> =
      FullIntentHandlers<Intent, stateCase, State, TCase>
        | (
          Partial<FullIntentHandlers<Intent, stateCase, State, TCase>>
            & { [DEFAULT]: IntentHandler<Intent, State, State> }
        )
    ​
    type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
        [stateCase in State[TCase]]: IntentHandlers<Intent, stateCase, State, TCase>
    } & {
      [INIT]: Partial<{
        [keyIntent in keyof Intent]: ((intent: Content<Intent[keyIntent]>) => Output<State>) | IGNORE
      }>
    };

    const myDeclaration: Declaration<MyIntent, MyState> = {
      StateCaseA: {
        inputA: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseB: {
        inputB: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseC: {
        [DEFAULT]: IGNORE
      },
      [INIT]: {
        inputA: (intent) => ({ case: "StateCaseA", dataForStateCaseA: intent }),
        inputB: (intent) => ({ case: "StateCaseB", dataForStateCaseB: intent.toString() }),
        inputX: (intent) => ({ case: "StateCaseC", dataForStateCaseC: intent.toString() }),
      }
    }
  }

  namespace initAsIntentHandler2 {

    type FullIntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> = {
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    } & {
      [INIT]:((intent: Intent) => Output<State>) | IGNORE
    };
    ​
    type IntentHandlers<Intent, stateCase extends string, State extends { [key in TCase]: string }, TCase extends string> =
      FullIntentHandlers<Intent, stateCase, State, TCase>
        | (
            Partial<FullIntentHandlers<Intent, stateCase, State, TCase>>
              & { [DEFAULT]: IntentHandler<Intent, State, State> }
        )
    ​
    type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
        [stateCase in State[TCase]]: IntentHandlers<Intent, stateCase, State, TCase>
    }

    const myDeclaration: Declaration<MyIntent, MyState> = {
      StateCaseA: {
        inputA: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseB: {
        inputB: (intent, state) => state,
        inputX: handlerForX,
        [DEFAULT]: IGNORE
      },
      StateCaseC: {
        [INIT]: IGNORE, // THIS SEEMS VERY WEIRD
        [DEFAULT]: IGNORE
      }
    }
  }
}
