import {
  companyCreated as companyCreatedEvent,
  contractPaused as contractPausedEvent
} from "../generated/Multipay/Multipay"
import { companyCreated, contractPaused } from "../generated/schema"

export function handlecompanyCreated(event: companyCreatedEvent): void {
  let entity = new companyCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.companyContract = event.params.companyContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlecontractPaused(event: contractPausedEvent): void {
  let entity = new contractPaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paused = event.params.paused

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
