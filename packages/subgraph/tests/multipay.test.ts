import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { companyCreated } from "../generated/schema"
import { companyCreated as companyCreatedEvent } from "../generated/Multipay/Multipay"
import { handlecompanyCreated } from "../src/multipay"
import { createcompanyCreatedEvent } from "./multipay-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let symbol = "Example string value"
    let companyContract = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newcompanyCreatedEvent = createcompanyCreatedEvent(
      name,
      symbol,
      companyContract
    )
    handlecompanyCreated(newcompanyCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("companyCreated created and stored", () => {
    assert.entityCount("companyCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "companyCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "companyCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "symbol",
      "Example string value"
    )
    assert.fieldEquals(
      "companyCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "companyContract",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
