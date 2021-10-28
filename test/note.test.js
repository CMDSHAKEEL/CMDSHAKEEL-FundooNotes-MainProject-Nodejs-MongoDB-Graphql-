// importing files and packages

const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const resolvers = require('../app/WorkingoFGraphql/resolvers/notereslovers')
const userSchema = fs.readFileSync(
  path.join(__dirname, ".", "schema.gql"),
  "utf8"
);

describe("Query", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test("Testing Note Query", () => {
    const query = `
    query
    {
        notes
        {
          description
          title
        }
    }
    `;
    const fixture = {
      data: {
        notes: [
          {
            description: "the king of the Forest",
            title: "The Lion"
          }
        ]
      }
    }
    tester.setFixture(fixture);
    const result = tester.mock({ query });
    expect(result.data.notes[0].description).toBe("the king of the Forest");
    expect(result.data.notes[0].title).toBe("The Lion");
  });
});
describe("Mutations", () => {
  let tester;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });


  describe("Mutations", () => {

    //createNote   Test Cases

    test("createNote-MutationTestPass-if-TheInputIsEmpty", () => {
      const mutation = `
          mutation createNote($post: ) {
            createNote(post: $post) {
              title
              description
            }
          }
        `;
       
      tester.test(false, mutation, {});
    });
  })
  test("createNote-MutationTestPass_IfThe-isNotGiven", () => {
    const mutation = `
        mutation createNote($post: InvalidInput) {
            createNote(post: $post) {
              title
              description
            }
          }
        `;
     
    tester.test(false, mutation, [
      {
        title: "The Lion",
        description: "the king of the Forest"
      }
    ]);
  });
  test("createNote-MutationTestPass-IfTheFirstArgIsTrue", () => {
    const mutation = `
        mutation createNote($post: NoteInput) {
            createNote(post: $post) {
              title
              description
            }
          }
        `;
   
    tester.test(true, mutation, {
      title: "The Lion",
      description: "the king of the Forest"
    });
  });

  //editNote Mutation Test Cases
  test("EditNote-MutationTestPass-IfTheFirstArgIsFalse ", () => {
    const mutation = `
      mutation editNote($post: ) {
        editNote(post: $post) {
          noteId
          title
          description
        }
      }
    `;
   
    tester.test(false, mutation, {});
  });
  test("EditNote-MutationTestPass- TheInputHasInvalidField", () => {
    const mutation = `
        mutation editNote($post:InvalidInput ) {
            editNote(post: $post) {
              noteId
              title
              description
            }
          }
        `;
     
    tester.test(false, mutation, [
      {
        title: "The Lion",
        description: "the king of the Forest"
      }
    ]);
  });
  test("EditNote-MutationTestPass-IfFirstArgIsTrue", () => {
    const mutation = `
        mutation editNote($post:NoteEdit ) {
            editNote(post: $post) {
              title
              description
            }
          }
        `;
 
    tester.test(true, mutation, {
      title: "The Lion",
      description: "the king of the Forest"
    });
  });

  //deletenote Mutation Test Case

  test(" deleteNote-MutationTestdPass-IftheNoteiD is False", () => {
    const mutation = `
      mutation deleteNote($post: ) {
        deleteNote(post: $post) {
          title
          description
        }
      }
    `;
    
    tester.test(false, mutation, {});
  });
  test("deleteNote-MutationTestdPass-TheInputHasInvalidField", () => {
    const mutation = `
        mutation deleteNote($post:InvalidInput ) {
            deleteNote(post: $post) {
              title
              description
            }
          }
        `;
     
    tester.test(false, mutation, [
      {
        title: "The Lion",
        description: "the king of the Forest"
      }
    ]);
  }); 
})




