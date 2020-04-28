---
layout: layout.njk
---
# Commands {#top}

## 1. Description {#theory}

* Describe the problem

Commands are in general used to represent an instruction.
We can identify two major use cases:

1. A way to abstract the concrete action taken when "activating" an input element (like a button)
2. A representation of instructions which are generated in one place and passed on to (an)other component(s) to complete the instruction.

In the first case we can see that first our code compiles a command, this is passed of to an intermediate who decides when to execute it, if at all. Only then we need to concern ourselves with the question: How is this command "executed". The focus here is more on decoupling declaring the command vs triggering the command's execution. Usually the command as described here is directly executable and as such is the task to be done in stead of a message representing the task to be done.

In the second case construction and execution of the command are assumed to be the same, and the focus is more on the "execution" part of this command. The focus here is more on decoupling requesting the commands execution vs actually executing the command.

So in both of these cases we can decouple the requesting side from the executing side, or the _what_ from the _how_ (and in case 1) the _when_ from the _what_. This allows is the implement a kind of pipeline which gives a place to hook some common (or not so common) concerns into the flow. If you want to even further decouple the timing you could add a queue in between the requesting and executing parts of the pipeline.

Commands in software have a couple of different roles.
We can use them to represent input to a process, represent the commissioning of a task

* Explain why this is a problem; motivate a best practice
* Sum up the (theoretical) requirements of a solution

## 2. Technological parts of the solution {#techparts}

* Give an overview of technological solutions to this problem.
* Qualify/Quantify how they match to/interpret the requirements

## 3. Basic integration in your codebase {#basicIntegration}

* Describe how to implement this/these solution(s) in a codebase
* What to watch out for
* Call out specific impact on other code or the overall architecture

## 4. Semi-copy pastable packaged example code {#prettySample}

* Provide a working sample
* explain the choices you made
* Call out settings to tweak
