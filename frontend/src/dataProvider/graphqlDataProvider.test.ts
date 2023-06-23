import { expect } from "@jest/globals";
import { getEntityFields, getListOperationName, getUpdateInputType } from "./graphqlDataProvider";

// TODO tests are related to current graphQL schema - need to be refactored, schema should be mocked
describe("graphqlDataProvider", () => {
  it("getListOperationName should return correct operation name for list query", async () => {
    const queryName = getListOperationName("PetDTO");
    expect(queryName).toEqual("petList");
  });

  // TODO no fields if there are no screens for PetDTO, types should be mocked
  xit("getListFields should return set of supported fields for query", async () => {
    let listFields = getEntityFields("PetDTO");
    expect(listFields.sort()).toEqual(["birthDate", "id", "identificationNumber"]);
  });

  it("getUpdateInputType", async () => {
    expect(getUpdateInputType("PetDTO")).toEqual("PetInputDTO");
    expect(getUpdateInputType("Owner")).toEqual("OwnerInput");
  });
});
