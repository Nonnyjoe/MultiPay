import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { planActive } from "../generated/schema"
import { planActive as planActiveEvent } from "../generated/Contract/Contract"
import { handleplanActive } from "../src/contract"
import { createplanActiveEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let planId = BigInt.fromI32(234)
    let planActive = "boolean Not implemented"
    let newplanActiveEvent = createplanActiveEvent(planId, planActive)
    handleplanActive(newplanActiveEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("planActive created and stored", () => {
    assert.entityCount("planActive", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "planActive",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "planId",
      "234"
    )
    assert.fieldEquals(
      "planActive",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "planActive",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
