// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class companyCreated extends ethereum.Event {
  get params(): companyCreated__Params {
    return new companyCreated__Params(this);
  }
}

export class companyCreated__Params {
  _event: companyCreated;

  constructor(event: companyCreated) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[1].value.toString();
  }

  get companyContract(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class contractPaused extends ethereum.Event {
  get params(): contractPaused__Params {
    return new contractPaused__Params(this);
  }
}

export class contractPaused__Params {
  _event: contractPaused;

  constructor(event: contractPaused) {
    this._event = event;
  }

  get paused(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class Multipay extends ethereum.SmartContract {
  static bind(address: Address): Multipay {
    return new Multipay("Multipay", address);
  }

  AccountcontractState(contractAccount: Address): boolean {
    let result = super.call(
      "AccountcontractState",
      "AccountcontractState(address):(bool)",
      [ethereum.Value.fromAddress(contractAccount)]
    );

    return result[0].toBoolean();
  }

  try_AccountcontractState(
    contractAccount: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "AccountcontractState",
      "AccountcontractState(address):(bool)",
      [ethereum.Value.fromAddress(contractAccount)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  AllSubscriptionContracts(param0: Address, param1: BigInt): Address {
    let result = super.call(
      "AllSubscriptionContracts",
      "AllSubscriptionContracts(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_AllSubscriptionContracts(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "AllSubscriptionContracts",
      "AllSubscriptionContracts(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  GetALLAddresses(): Array<Address> {
    let result = super.call(
      "GetALLAddresses",
      "GetALLAddresses():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_GetALLAddresses(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "GetALLAddresses",
      "GetALLAddresses():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  GetSpecificAddress(_owner: Address): Address {
    let result = super.call(
      "GetSpecificAddress",
      "GetSpecificAddress(address):(address)",
      [ethereum.Value.fromAddress(_owner)]
    );

    return result[0].toAddress();
  }

  try_GetSpecificAddress(_owner: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "GetSpecificAddress",
      "GetSpecificAddress(address):(address)",
      [ethereum.Value.fromAddress(_owner)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  Identity(param0: Address): BigInt {
    let result = super.call("Identity", "Identity(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_Identity(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("Identity", "Identity(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  RemoveSubscribedContract(_caller: Address): boolean {
    let result = super.call(
      "RemoveSubscribedContract",
      "RemoveSubscribedContract(address):(bool)",
      [ethereum.Value.fromAddress(_caller)]
    );

    return result[0].toBoolean();
  }

  try_RemoveSubscribedContract(_caller: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "RemoveSubscribedContract",
      "RemoveSubscribedContract(address):(bool)",
      [ethereum.Value.fromAddress(_caller)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  UpdateSubscriptionContracts(_caller: Address): boolean {
    let result = super.call(
      "UpdateSubscriptionContracts",
      "UpdateSubscriptionContracts(address):(bool)",
      [ethereum.Value.fromAddress(_caller)]
    );

    return result[0].toBoolean();
  }

  try_UpdateSubscriptionContracts(
    _caller: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "UpdateSubscriptionContracts",
      "UpdateSubscriptionContracts(address):(bool)",
      [ethereum.Value.fromAddress(_caller)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  companyAddresses(param0: BigInt): Address {
    let result = super.call(
      "companyAddresses",
      "companyAddresses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_companyAddresses(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "companyAddresses",
      "companyAddresses(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createCompany(_name: string, _symbol: string, _admin: Address): Address {
    let result = super.call(
      "createCompany",
      "createCompany(string,string,address):(address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromAddress(_admin)
      ]
    );

    return result[0].toAddress();
  }

  try_createCompany(
    _name: string,
    _symbol: string,
    _admin: Address
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createCompany",
      "createCompany(string,string,address):(address)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_symbol),
        ethereum.Value.fromAddress(_admin)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  factoryContract(): Address {
    let result = super.call(
      "factoryContract",
      "factoryContract():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_factoryContract(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "factoryContract",
      "factoryContract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerToCompany(param0: Address): Address {
    let result = super.call(
      "ownerToCompany",
      "ownerToCompany(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toAddress();
  }

  try_ownerToCompany(param0: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "ownerToCompany",
      "ownerToCompany(address):(address)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  returnAllSubscripton(_caller: Address): Array<Address> {
    let result = super.call(
      "returnAllSubscripton",
      "returnAllSubscripton(address):(address[])",
      [ethereum.Value.fromAddress(_caller)]
    );

    return result[0].toAddressArray();
  }

  try_returnAllSubscripton(
    _caller: Address
  ): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "returnAllSubscripton",
      "returnAllSubscripton(address):(address[])",
      [ethereum.Value.fromAddress(_caller)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  tokenForPayment(): Address {
    let result = super.call(
      "tokenForPayment",
      "tokenForPayment():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_tokenForPayment(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tokenForPayment",
      "tokenForPayment():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  tokenForReceipt(): Address {
    let result = super.call(
      "tokenForReceipt",
      "tokenForReceipt():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_tokenForReceipt(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "tokenForReceipt",
      "tokenForReceipt():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalCompaniesID(): BigInt {
    let result = super.call(
      "totalCompaniesID",
      "totalCompaniesID():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalCompaniesID(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalCompaniesID",
      "totalCompaniesID():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  trackUserSubIndex(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "trackUserSubIndex",
      "trackUserSubIndex(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_trackUserSubIndex(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "trackUserSubIndex",
      "trackUserSubIndex(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _tokenForReceipt(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tokenForPayment(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RemoveSubscribedContractCall extends ethereum.Call {
  get inputs(): RemoveSubscribedContractCall__Inputs {
    return new RemoveSubscribedContractCall__Inputs(this);
  }

  get outputs(): RemoveSubscribedContractCall__Outputs {
    return new RemoveSubscribedContractCall__Outputs(this);
  }
}

export class RemoveSubscribedContractCall__Inputs {
  _call: RemoveSubscribedContractCall;

  constructor(call: RemoveSubscribedContractCall) {
    this._call = call;
  }

  get _caller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveSubscribedContractCall__Outputs {
  _call: RemoveSubscribedContractCall;

  constructor(call: RemoveSubscribedContractCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class UpdateSubscriptionContractsCall extends ethereum.Call {
  get inputs(): UpdateSubscriptionContractsCall__Inputs {
    return new UpdateSubscriptionContractsCall__Inputs(this);
  }

  get outputs(): UpdateSubscriptionContractsCall__Outputs {
    return new UpdateSubscriptionContractsCall__Outputs(this);
  }
}

export class UpdateSubscriptionContractsCall__Inputs {
  _call: UpdateSubscriptionContractsCall;

  constructor(call: UpdateSubscriptionContractsCall) {
    this._call = call;
  }

  get _caller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateSubscriptionContractsCall__Outputs {
  _call: UpdateSubscriptionContractsCall;

  constructor(call: UpdateSubscriptionContractsCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class CreateCompanyCall extends ethereum.Call {
  get inputs(): CreateCompanyCall__Inputs {
    return new CreateCompanyCall__Inputs(this);
  }

  get outputs(): CreateCompanyCall__Outputs {
    return new CreateCompanyCall__Outputs(this);
  }
}

export class CreateCompanyCall__Inputs {
  _call: CreateCompanyCall;

  constructor(call: CreateCompanyCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _admin(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class CreateCompanyCall__Outputs {
  _call: CreateCompanyCall;

  constructor(call: CreateCompanyCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}
