---
layout: layout.njk
title: On Commands
date: 2020-05-05 15:00:00
authors:
  - name: Joris Goovaerts
  - name: Ruben Goris
---
## In context {#inContext}

When talking about Commands we should consider in which light they are most often used.
The most important trigger for most people is the desire to implement CQS or even CQRS. [^cqrsNotEasy]
Whether or not this is the right choice for your specific situation is another topic all together. But let's imagine that you want to do this.

### Command-Query Separation {#cqs}

> **NOTE**:  Add reference to CQRS/CQS ?

> **NOTE**: Add remark that CQS commands don't have to be a thing in you application.
It is about keeping the modifying operations separate from the reading(querying) operations.

> **NOTE**:  Add reference to Domain

Commands are most often used to interact with the core part of the application and decouple it from the way in which it is hosted.
Since this is the core of the application, we would do well to keep it at the center of our design concerns.
It should be the beating heart, which steers the design direction.
Whose influence permeates the whole of the application.
We as technical people would do well to remember this and not let our technological preferences permeate the core. [^domain]

<!-- * [x] Describe the problem -->

## As signature {#asSignature}

Commands are in general used to represent an instruction packaged as a message.
This representation is then passed off to the "system" for execution.
This usually happens in one of two ways: or we have a direct reference to the system of note and we "just" pass on the instruction, or we don't and have a channel through which we can sent (any kind of) commands and be assured that they will be delivered to the logical receiver.

On the receiving or accepting side of these instructions, we often expect to receive some data (content of the command) together with the intention (name of the command) of the instruction.
While the structuring of a command as an object (or record) nicely couples (and types) these two together.
This can be considered as nothing but another representation of a method call `intention(data)` and conveys exactly the same information.

<!-- So now we have shown that you can understand command definitions as method signatures we can look at another look at commands. -->

## As communication {#asCommunication}

You could also say that commands communicate instructions between the sender and receiver of the [previous section](#asSignature) and so decouple the implementation of the sender from the implementation of the receiver through an abstraction layer, not unlike an interface.

When this communication happens as a normal call, there is no impact on the command by this role.
If we want to decouple these two parties further and outsource the delivery to an external system like a queue, a bus or other messaging system, we have to assume things like serialization and deserialization.
Whatever the technology in use, you cannot assume that the way you structured your data in memory is transferable across in the wire in the same format.

## As flow {#asFlow}

A command could also be perceived as representing a flow, or the doorway to a flow.
Certainly representing the road between requester and executor in this way is a popular opinion, a lot of pseudo-magical dispatchers exist to help with implementing this idea.
Often this is reduced to a central component doing all the routing based on some predefined rules and you follow those or it doesn't work, while the pipeline idea is lost.
A declarative flow as a pipeline can still reuse base or default steps, but at the same time allows specific flows to be augmented with the relevant context and/or operations.

Having these kinds of flows in an j

<!-- * [x] Explain why this is a problem; motivate a best practice -->

## Cross section

Looking at the [signature](#asSignature) and [communication](#asCommunication) sections we can discern some conflicting goals:

1. Provide an abstract description of both intention and its allowed and/or required parameters
2. Provide an easily transferable message

Many a time this will not pose a problem, but it happens often enough that because of constraints in how messages are put on the wire a certain expressiveness has to be removed to still allow unambiguous serialization and/or deserialization.

> ***NOTE*:** insert can-o-worms image

![Can-o-worms](https://www.planetnatural.com/wp-content/uploads/2013/03/can-o-worms.jpg "image")

<!-- * [ ] Sum up the (theoretical) requirements of a solution -->

### Requirements of the solution

We want

1. Our architecture to be *simple*
2. To avoid unnecessary entanglement, to maximize flexibility
3. To reduce the impact of a later change
4. To maximize the possible utility of an implemented pattern

Whilst it is arguably *easier* to capture both these roles in one element, decoupling these two roles from each other enables you to *simplify* your architecture and lessen the overall impact of using commands.

![Explosion](https://media.giphy.com/media/XUFPGrX5Zis6Y/giphy.gif "nuclear explosion")

## 2. Technological parts of the solution {#techParts}

* Give an overview of technological solutions to this problem.
* Qualify/Quantify how they match to/interpret the requirements

## 3. Basic integration in your codebase {#basicIntegration}

* Describe how to implement this/these solution(s) in a codebase
* What to watch out for
* Call out specific impact on other code or the overall architecture

## 4. Semi "copy paste"-able packaged example code {#prettySample}

* Provide a working sample
* Explain the choices you made
* Call out settings to tweak

*[CQS]: Command-Query Separation
*[CQRS]: Command Query Responsibility Segregation

[^cqrsNotEasy]: Correctly implementing CQRS is not for the faint of heart. See the last paragraph of [Martin Fowler - CQRS - When to use it](https://martinfowler.com/bliki/CQRS.html#WhenToUseIt)

[^domain]: See [On the domain](/topics/onTheDomain)
