---
layout: layout.njk
---
# On Commands {#top}

## 1. Description {#theory}

<!-- * [x] Describe the problem -->

### As signature {#asSignature}

Commands are in general used to represent an instruction packaged as a message. This representation is then passed of to the "system" for execution. This usually happens in one of two ways: or we have a direct reference to the system of note and we "just" pass on the instruction, or we don't and simply have a channel through which we can sent (any kind of) commands and be assured that they will be delivered to the logical receiver.

On the receiving or accepting side of these instructions, we often expect to receive some data (content of the command) together with the intend (name of the command) of the instruction. While the structuring of a command as an object (or record) nicely couples (and types) these two together, this is of course just another representation of a method call: `intend(data)` conveys exactly the same information.

<!-- So now we have shown that you can understand command definitions as method signatures we can look at another look at commands. -->

### As communication {#asCommunication}

You could also say that commands communicate instructions between the sender and receiver of the [previous section](#asSignature) and so decouple the implementation of the sender from the implementation of the receiver through an abstraction layer, not unlike an interface.

When this communication happens as a normal call, there is no impact on the command by this role. If however we want to decouple these two parties further and outsource the delivery to an external system like a queue, a bus or other messaging system, we have to assume things like serialization and deserialization. Whatever the technology in use, you cannot assume that the way you structured your data in memory is transferable across in the wire in the same format.

> **_NOTE_:** Add the stuff about a pipeline here?

<!-- * [x] Explain why this is a problem; motivate a best practice -->

### Cross section

Looking at the [signature](#asSignature) and [communication](#asCommunication) sections we can discern some conflicting goals:

1. Provide a abstract description of both intend and its allowed and/or required parametrization
2. Provide an easily transferable message

Many a time this will not pose a problem, but it happens often enough that because of constraints in how messages are put on the wire a certain expressiveness has to be removed to still allow unambiguous (de)serialization.

> **_NOTE_:** insert can-o-worms image

<!-- * [ ] Sum up the (theoretical) requirements of a solution -->

### Requirements of the solution

We want

1. our architecture to be _simple_
2. to avoid unnecessary entanglement, to maximize flexibility
3. to reduce the impact of later change
4. to maximize the possible utility of an implemented pattern

Whilst it is arguably _easier_ to capture both these roles in one element, decoupling these two roles from each other enables you to _simplify_ your architecture and lessen the overall impact of using commands.

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
