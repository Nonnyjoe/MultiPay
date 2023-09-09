import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  planActive,
  planCreated,
  subscriptionsUpdated,
  userRenewed,
  userSubscribed
} from "../generated/Contract/Contract"

export function createplanActiveEvent(
  planId: BigInt,
  planActive: boolean
): planActive {
  let planActiveEvent = changetype<planActive>(newMockEvent())

  planActiveEvent.parameters = new Array()

  planActiveEvent.parameters.push(
    new ethereum.EventParam("planId", ethereum.Value.fromUnsignedBigInt(planId))
  )
  planActiveEvent.parameters.push(
    new ethereum.EventParam(
      "planActive",
      ethereum.Value.fromBoolean(planActive)
    )
  )

  return planActiveEvent
}

export function createplanCreatedEvent(
  name: string,
  price: BigInt,
  duration: BigInt,
  planId: BigInt
): planCreated {
  let planCreatedEvent = changetype<planCreated>(newMockEvent())

  planCreatedEvent.parameters = new Array()

  planCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  planCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  planCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  planCreatedEvent.parameters.push(
    new ethereum.EventParam("planId", ethereum.Value.fromUnsignedBigInt(planId))
  )

  return planCreatedEvent
}

export function createsubscriptionsUpdatedEvent(
  time: BigInt,
  totalSubsUpdated: BigInt
): subscriptionsUpdated {
  let subscriptionsUpdatedEvent = changetype<subscriptionsUpdated>(
    newMockEvent()
  )

  subscriptionsUpdatedEvent.parameters = new Array()

  subscriptionsUpdatedEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )
  subscriptionsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalSubsUpdated",
      ethereum.Value.fromUnsignedBigInt(totalSubsUpdated)
    )
  )

  return subscriptionsUpdatedEvent
}

export function createuserRenewedEvent(
  planId: BigInt,
  userAddress: Address,
  renewed: boolean,
  startTime: BigInt,
  endTime: BigInt
): userRenewed {
  let userRenewedEvent = changetype<userRenewed>(newMockEvent())

  userRenewedEvent.parameters = new Array()

  userRenewedEvent.parameters.push(
    new ethereum.EventParam("planId", ethereum.Value.fromUnsignedBigInt(planId))
  )
  userRenewedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userRenewedEvent.parameters.push(
    new ethereum.EventParam("renewed", ethereum.Value.fromBoolean(renewed))
  )
  userRenewedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  userRenewedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )

  return userRenewedEvent
}

export function createuserSubscribedEvent(
  email: string,
  autoSubscribe: boolean,
  userAddress: Address,
  planName: string
): userSubscribed {
  let userSubscribedEvent = changetype<userSubscribed>(newMockEvent())

  userSubscribedEvent.parameters = new Array()

  userSubscribedEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromString(email))
  )
  userSubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "autoSubscribe",
      ethereum.Value.fromBoolean(autoSubscribe)
    )
  )
  userSubscribedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userSubscribedEvent.parameters.push(
    new ethereum.EventParam("planName", ethereum.Value.fromString(planName))
  )

  return userSubscribedEvent
}
