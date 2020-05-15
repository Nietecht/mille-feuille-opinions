type xs<T> = [T];
type Content<T> = T extends xs<infer U> ? U : never
type Case<TCaseValue extends string, T, TCase extends string = 'case'> = T extends { [key in TCase]: TCaseValue } ? T : never;
const DEFAULT = Symbol();
type DEFAULT = typeof DEFAULT;
const SIDEEFFECTS = Symbol();
type SIDEEFFECTS = typeof SIDEEFFECTS;
const STATE = Symbol();
type STATE = typeof STATE;
const OUTPUT = Symbol();
type OUTPUT = typeof OUTPUT;
type Output<T> = { [STATE]: T, [OUTPUT]?: [any] } | T;
const IGNORE = Symbol();
type IGNORE = typeof IGNORE;
type IntentHandler<Intent, CaseState, State> = ((intent: Intent, state: CaseState) => Output<State>) | IGNORE

type FullIntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> = {
    [stateCase in State[TCase]]: IntentHandler<Intent, Case<stateCase, State, TCase>, State>
  }
​
type IntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> =
  FullIntentHandlers<Intent, State, TCase> | (Partial<FullIntentHandlers<Intent, State, TCase>> & { [DEFAULT]: IntentHandler<Intent, State, State> })
​
type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
    [keyIntent in keyof Intent]: IntentHandlers<Content<Intent[keyIntent]>, State, TCase>
  }

// --------------------------------------

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
    dataForStateCaseB: string
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
  ​
  const myDeclaration: Declaration<MyIntent, MyState> = {
    inputA: {
      StateCaseA: (intent, state) => ({[STATE]: state}),
      [DEFAULT]: IGNORE
    },
    inputB: {
      StateCaseB: (intent, state) => state,
      [DEFAULT]: IGNORE
    },
    inputX: {
      StateCaseA: handlerForX,
      StateCaseB: handlerForX,
      [DEFAULT]: IGNORE
    }
  }

  type DeclarationInverse<Intent, State extends { [key in TCase]: string }, TCase extends string = 'case'> = {
    [stateCase in State[TCase]]: {
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    }
  } | {
    [stateCase in State[TCase]]: (Partial<{
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    }> &  { [DEFAULT]: IntentHandler<Intent, State, State> })
  }
  const myInverseDeclaration: DeclarationInverse<MyIntent, MyState> = {
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
    }
  }
