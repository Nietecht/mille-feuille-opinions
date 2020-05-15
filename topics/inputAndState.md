---
layout: layout.njk
title: TBD
---
## Content outline (version 2020 05 17 #2)

1. Outlay of the basic types of the code sample
2. Try to build each of the defined open cases as a result of certain desired properties or questions we can ask ourselves
3. Context in which we want to investigate the (here given) relative (and absolute) merits of the open cases
4. A case by case investigation of the impact on the specified merits of each of the cases
5. Investigation of the ways to **initialize** a system like this
6. Conclusions? Can something be said about:
   * Composition
   * Changeability

This approach can side step the Graph Theory approach and focus more on the investigation of existing code.
In this way the subject gets a more solid footing and removes the problem having a vaguely defined subject of which stating something risks reoriënting the research on every twist and turn.
It would always be possible to later on write a paper according to the previous content outline

On this note:

About `[INIT]` we can already state that requiring one master `[INIT]`

## Content outline (version 2020 05 17)

1. Outlay of the code sample and explanation of the open cases
2. Context in which we want to investigate the (here given) relative (and absolute) merits of the open cases
3. A case by case investigation of the impact on the specified merits of each of the cases
4. Investigation of the ways to **initialize** a system like this
5. Conclusions? Can something be said about:
   * Composition
   * Changeability

This approach can side step the Graph Theory approach and focus more on the investigation of existing code.
In this way the subject gets a more solid footing and removes the problem having a vaguely defined subject of which stating something risks reoriënting the research on every twist and turn.
It would always be possible to later on write a paper according to the previous content outline

On this note:

About `[INIT]` we can already state that requiring one master `[INIT]`

## Content outline (version 2020 05 16)

1. Short introduction to the problem space => Intent something something (is _something_ here _case_ ?)
2. Try to derive base solution based on some desired properties
3. Define the initial _something_ and differing mechanics of putting the system there
4. Try to derive relative (and perhaps absolute) merits of composition and changeability

The currently written text assumes an approach drawing on Graph Theory in which we can see parallels between _intent_ being like an _edge_ and _something_ being like a _vertex_.
Because this assumes Graph Theory knowledge, it could prove to daunting for a lot of readers.
On the other hand it provides a lot of standardized naming, and theorems, and proves which could help in thoroughly exploring this space.

## Impact

### Intent types

1) Empty intent
2) Intent with parameters
3) Intent packaging data

## Impact of state

### Kinds of state

1. Source states: you cannot transition into this state from any other state, but you can transition to other states.
Or in Graph Theory terms: a Vertex with an _indegree_ of zero[^1]
2. Sink states: you only transition into this state, never out of the state.
Or in Graph Theory terms: a Vertex with an _outdegree_ of zero[^1]
3. Internal states: you can transition both in and out of this state.
Or in Graph Theory terms: a Vertex with both _indegree_ and _outdegree_ non-zero[^1]

### Starter state

> **NOTE** Consider using _Source state_

It is impossible to transition into this state from any other state.
They can allow transition to another state.
Which means that they only have outbound dependencies on the other states of the graph/system.
Or that vice versa these states have only inbound dependencies from these kinds of state.

Given this unidirectional dependency, it is quite clear that adding a starter state does not have a great impact on the other states.
The other states don't have to care about how (or from where) the transition is happening.
But be careful, because every added transition option increases the complexity of the graph/system as a whole.
Also, it adds more couplings to the states you are newly transitioning to.
Looking at our setups it seems that the IS system is more impacted than the SI.
Because in the former case, possibly a whole lot of input cases need to be added to.
While in the latter case only the state block gets added with its respective input cases.

> **NOTE** Perhaps we should also consider that when you are adding a starter state, you are very probably also adding an input type?

Removing a starter state has the reverse effect.
It decreases the amount of states (and probably) the number of possible transitions.
Some vigilance about removing the only starter state could be appropriate.
It should however be noted that the program could always be started from a none starter state.
Looking at our setups it seems that the IS system is more impacted than the SI.
Because in the former case, possibly a whole lot of input cases referencing this state need to adapt.
While in the latter case only the state block gets removed with its respective input cases.

#### Impact of adding

The Show must go ON

#### Impact of removal

#### Impact of changing

## Impact of input

### Kinds of input

1. Kind 1
2. Kind 2

<!--
werkwijze is wss:

1. Soorten van StateTypes & input types
2. impact van verwijderen van specifieke sorten van statetypes & input types
3. Impact van toevoegen
4. Impact van aanpassen (mss nog per soort van aanpassing)
-->

```typescript
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
type IntentHandler<Intent, CaseState, State> = ((intent: Intent, state: CaseState) => Output<State>) | IGNORE
​
type FullIntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> = {
    [stateCase in State[TCase]]: IntentHandler<Intent, Case<stateCase, State, TCase>, State>,
    [INIT]: IntentHandler<{}, Case<INIT, State, TCase>, State>
  }
​
type IntentHandlers<Intent, State extends { [key in TCase]: string }, TCase extends string> =
  FullIntentHandlers<Intent, State, TCase> | (Partial<FullIntentHandlers<Intent, State, TCase>> & { [DEFAULT]: IntentHandler<Intent, State, State> })
​
type Declaration<Intent, State extends { [key in TCase]: string }, TCase extends string = "case"> = {
    [keyIntent in keyof Intent]: IntentHandlers<Content<Intent[keyIntent]>, State, TCase>
  }
​
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
    StateCaseA: handlerForX,
    StateCaseB: handlerForX,
    [DEFAULT]: IGNORE
  }
};

type DeclarationInverse<Intent, State extends { [key in TCase]: string }, TCase extends string = 'case'> = {
    [stateCase in State[TCase]]: {
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    }
  } | {
    [stateCase in State[TCase]]: (Partial<{
      [keyIntent in keyof Intent]: IntentHandler<Content<Intent[keyIntent]>, Case<stateCase, State, TCase>, State>
    }> &  { [DEFAULT]: IntentHandler<Intent, State, State> })
  }
/// Declaration from state handles input as _func_​
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

```

*[IS]: Input-State - By Input declare the handling per State
*[SI]: State-Input - By State declare the handling of Input

[^1]: [Wikipedia - Directed graph - Indegree and outdegree](https://en.wikipedia.org/wiki/Directed_graph#Indegree_and_outdegree)
