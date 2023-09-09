import {
  planActive as planActiveEvent,
  planCreated as planCreatedEvent,
  subscriptionsUpdated as subscriptionsUpdatedEvent,
  userRenewed as userRenewedEvent,
  userSubscribed as userSubscribedEvent
} from "../generated/Contract/Contract"
import {
  planActive,
  planCreated,
  subscriptionsUpdated,
  userRenewed,
  userSubscribed
} from "../generated/schema"

export function handleplanActive(event: planActiveEvent): void {
  let entity = new planActive(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.planId = event.params.planId
  entity.planActive = event.params.planActive

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleplanCreated(event: planCreatedEvent): void {
  let entity = new planCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.price = event.params.price
  entity.duration = event.params.duration
  entity.planId = event.params.planId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesubscriptionsUpdated(
  event: subscriptionsUpdatedEvent
): void {
  let entity = new subscriptionsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.time = event.params.time
  entity.totalSubsUpdated = event.params.totalSubsUpdated

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleuserRenewed(event: userRenewedEvent): void {
  let entity = new userRenewed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.planId = event.params.planId
  entity.userAddress = event.params.userAddress
  entity.renewed = event.params.renewed
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleuserSubscribed(event: userSubscribedEvent): void {
  let entity = new userSubscribed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.email = event.params.email
  entity.autoSubscribe = event.params.autoSubscribe
  entity.userAddress = event.params.userAddress
  entity.planName = event.params.planName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
