# Next-Gen-Frontend-Shared

_Module for sharing common react components, types, etc. between the BackOffice and the Customer App_

#### Preview:

Install dependencies `yarn`

Run storybook `yarn storybook`

#### Target projects:

- BackOffice: [https://github.com/CustomerApp-LumBe/Next-Gen-Backoffice-Frontend]
- Customer App: [https://github.com/CustomerApp-LumBe/Next-Gen-Frontend/tree/main]

#### Adding changes:

- Branching from `master` branch
- Code review
- Approval
- After merging changes to the master branch, it's necessary to update projects that use this module:
  _in target project_ `git submodule update --remote Next-Gen-Frontend-Shared`
- In cases when it's necessary to use specific commit from `Next-Gen-Frontend-Shared` in target repo, do following:
  - `cd Next-Gen-Backoffice-Frontend` or `cd Next-Gen-Frontend`
  - `cd @shared`
  - `git checkout SHARED_MODULE_SPECIFIC_COMMIT_HASH`
  - `cd ..`
  - `git add @shared`
  - `git commit -m COMMIT_MESSAGE`
- The project will reference a specific commit of the submodule
