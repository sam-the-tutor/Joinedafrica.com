### Everything you need to know about the test folder and using the mops.one/test library

- The mentioned library requires that all test files be put in a test folder in the root directory.
- All test files should end in \*.test.mo

- Running `mops test` command will run all the test files in the test folder. You can also configure scripts in the package.json to run specific test files.

- To run tests, you need to intialize the cansister instance and call the crespective methods on it.
- So the actors have to be declared as classes.

- Also, testing using this library cannot be done on canisters intialized in this forrmat "mo:canisterName" or actors that have been initialized in this way
  `let rr = actor("canister-id")`

- I am finding it a challenge to test actor functions that call other functions on imported canisters.

The main limiting issue is the way to structure our actor classes so as to be able to run tests on it using the mops/test library.

Once this issue is resolved,we can restructure our code and write real tests. for now lets pause writing the tests.

Once I figure out the right the solution to the above two challenges, I will provide a solution so as we start writing clear tests right away.

**Note** : I have not made any changes to the existing codebase, so these tests cant be run successfully. I have just added the `test folder`, on top of installing the `test` library with `mops`. Hope to figure out the solution pretty quickly.
