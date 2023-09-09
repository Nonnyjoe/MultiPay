import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { companyCreated, contractPaused } from "../generated/Multipay/Multipay"

export function createcompanyCreatedEvent(
  name: string,
  symbol: string,
  companyContract: Address
): companyCreated {
  let companyCreatedEvent = changetype<companyCreated>(newMockEvent())

  companyCreatedEvent.parameters = new Array()

  companyCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  companyCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  companyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "companyContract",
      ethereum.Value.fromAddress(companyContract)
    )
  )

  return companyCreatedEvent
}

export function createcontractPausedEvent(paused: boolean): contractPaused {
  let contractPausedEvent = changetype<contractPaused>(newMockEvent())

  contractPausedEvent.parameters = new Array()

  contractPausedEvent.parameters.push(
    new ethereum.EventParam("paused", ethereum.Value.fromBoolean(paused))
  )

  return contractPausedEvent
}
