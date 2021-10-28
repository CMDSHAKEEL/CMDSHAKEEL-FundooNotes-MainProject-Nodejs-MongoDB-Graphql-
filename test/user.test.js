const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

 
const userSchema = fs.readFileSync(
  path.join(__dirname, ".", "schema.gql"),
  "utf8"
);

describe("Queries", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test("should pass with query", () => {
    const query = `
    query
    {
      users {
        _id
        firstName
        lastName
        email
        password
      }
    }
    `;

    const fixture = {
      data: {
        users: [{
          _id: "61657335e0ef6209bd9b7f35",
          firstName: "cmd",
          lastName: "shakeel",
          email: "cmdshakeel3377@gmail.com",
          password: "cmdshakeel"
        }]
      }
    }
    tester.setFixture(fixture);
    const result = tester.mock({ query });
    expect(result.data.users[0]._id).toBe("61657335e0ef6209bd9b7f35",);
    expect(result.data.users[0].firstName).toBe("cmd");
    expect(result.data.users[0].lastName).toBe("shakeel");
    expect(result.data.users[0].email).toBe("cmdshakeel3377@gmail.com");
    expect(result.data.users[0].password).toBe("cmdshakeel");

  });
});
describe("Mutations", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });


  describe("Mutations", () => {

    //createUser Test Cases

    test("createuser-mutationtestpass-iftheFirstargsFalse", () => {
      const mutation = `
        mutation createUser($path: UserInput!) {
            firstName
            lastName
            email
            password
          
        }
      `;
       
      tester.test(false, mutation, {});
    });
    test("createuser-mutationtestpass-ifInput is Invalied", () => {
      const mutation = `
      mutation createUser($path: UserInput!) {
        createUser(input: $path) {
          firstName
          lastName
          email
          password
        }
        }
      `;
       
      tester.test(false, mutation, [
        {
          firstName: "cmd",
          lastName: "shakeel",
          email: "cmdshakeel3377@gmail.com",
        }
      ]);
    });
    


    //loginUser  Testing
    
    test("loginUser-MutationtestPass -if inputisEmpty", () => {
      const mutation = `
        mutation loginUser($input: ) {
          loginUser(input: $input) {
            _id
            token
            firstName
            lastName
            email
          }
        }
      `;
      
      tester.test(false, mutation, {});
    });

    
    test("loginUser-MutationTestPass-TheInputHasInvalid", () => {
      const mutation = `
      mutation loginUser($input:InvalidInput) {
        loginUser(input: $input) {
          _id
          token
          firstName
          lastName
          email
          getNotes
        }
      }
      `;
       
      tester.test(false, mutation, [
        {
          firstName: "cmd",
          lastName: "shakeel",
          email: "cmdshakeel3377@gmail.com",
        }
      ]);
    });
     
 
 
   
    
  })
})





