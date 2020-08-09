# Continuous Integration with GitHub Actions

## The Basics

### The .github Directory

* Each repository should have a `.github` directory
* Every `.github` directory should contain two new sub-directories which are **name-specific**:
  * `ISSUE_TEMPLATE`
  * `workflows`
* Each subdirectory should contain certain files which are also **name-specific**
  * In the `ISSUE_TEMPLATE` directory are files for that give a template for both reporting bugs and requesting features through the GitHub Issue Tracker. These files can contain a customized template, but must have these names:
    * `bug_report.md`
    * `feature_request.md`
  * The `workflows` directory contains the necessary files for continuous integration with GitHub Actions. This file can have any name but requires a `.yml` extension.
* In the `github` directory a **name-specific** file that specifies the pull request template is also required. It should be named: `pull_request_template.md`

#### File Layout Visual:

```
EthicalCSWebsite
├─ .github
│  ├─ ISSUE_TEMPLATE
│  │  ├─ bug_report.md
|  |  ├─ custom.md
│  │  └─ feature_request.md
│  ├─ pull_request_template.md
│  └─ workflows
│     └─ main.yml
```

**Please ensure that every file in your `.github` directory has the specified name, as GitHub searches for them when implementing templates for issues and PRs, and also running continuous integration checks with GitHub Actions.**

### Other File Requirements

* There are also requirements for files in the root of your repository, which are also **name-specific** including:
  * `.gitignore`: Specifies the files that Git should ignore
  * `.gitmessage`: Provides guidelines for commit messages, and gives a message to a developer after they make a commit to your project
  * `CODE_OF_CONDUCT.md`: A customized code of conduct for developers to define community standards
  * `CONTRIBUTING.md`: A customized list of guidelines for individuals who would like to contribute to your project
  * `LICENSE.md`: Guidelines for sharing software
  * `README.md`: Introduces and explains your project
* These files should not exist in a separate directory but the *root* of your github repository.

#### File Layout Visual:

```
EthicalCSWebsite
├─ .gitignore
├─ .gitmessage
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
├─ LICENSE.md
├─ README.md
```

## Setting Up Continuous Integration

In your `workflows` directory, exists the main file for setting up continuous integration with GitHub Actions. Remember, this file can have any name, but **must** have the `.yml` extension.

Your `.yml` file must follow a certain structure:
* A specified name
* Definition of when checks will begin
* Create a job which performs all checks
* Define each check in the job

### Name

At the beginning of the file specify the name of your workflow.

```
name: build
```

### Beginning Checks

Checks can be started on multiple different events, in this example, they are started upon a push to `master` or before a pull request is merged to `master`. Please refer to this [link](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions) for futher information on defining the start of a workflow.

```
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
```

### Creating a Job

With GitHub Actions, one or more jobs can be created, and run simultaneously. In cases of non-complex continuous integration, it is easier to define only one job. To define a job there must be the following layout defined:

* `runs-on`: Determines which operating system or multiple systems to run checks with
* `matrix`: Defines multiple versions of languages to test an application against
  * `python-version`: Defines the versions of python to perform checks against
  * *You can define versions of other programming languages as well*

```
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        # Performs all actions on different versions of Python
        python-version: [3.6, 3.7, 3.8]
```

### Define checks
Once a job is defined, checks can be defined under that subcategory. Workflow steps must be defined, in each of these steps are the details associated with a certain check. There can be multiple steps included in a single job.

Each step requires a:
* `name`: Appears in list of checks in GitHub Actions. A name should be descriptive so you can understand what check did or did not pass.

GitHub has an [GitHub Marketplace](https://github.com/marketplace) which contains thousands of defined actions that can be used in your workflow. In the [Github Marketplace](https://github.com/marketplace) you can search through a library of actions, and find which performs the checks you are interested in. Actions define checks to be performed without writing all necessary code, and make continuous integration much easier. When using a action in a step, `name` is required along with:
* `uses`: Defines the name of the action which you have selected
* Other specifications which are found on the [marketplace](https://github.com/marketplace) in the action's documentation. Often the steps are easy and clear to follow.

If the [GitHub Marketplace](https://github.com/marketplace) does not currently have an action for what step you would like to perform, you can write the code necessary to perform a check. If you are interested in writing your own check the step requires a `name`, as well as:

* `run |`: Include the exact command or commands which you would write in your terminal window to perform a certain action

```
//
```

**When creating your `.yml` file and workflow for continuous integration indentation is extremely important!**

**Ensure that each step of a job begins with `- name` and that they all begin with the same indentation. Make sure you check for correct layout, or your workflow will not run.**

### A Simple Workflow:

```
//
```

### Checking Build Status

There are multiple ways to check the status of your build

1. Click the actions tab of your repository, a list of your builds will appear

2. Click the status in the header of your repository

3. Add a continuous integration badge to your `README.md` file, you can click on this to find a list of your builds, this can be done by adding this line of code to your `README.md`

`[![Actions Status](https://github.com/Allegheny-Mozilla-Fellows/EthicalCSWebsite/workflows/build/badge.svg)](link_to_your_repository)`

**A green check represents a passing build and a red x represents a failing build, you can investigate these further in each build's summary**
