# README

Quick repo to translate and share the github discussion json export.

## Export discussions from Github
For reference, [here are all of the fields](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions) you can extract from Github.

To export data, you'll need a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to read public repo info.

Run: `export READONLY_GH_TOKEN=YOUR_TOKEN_HERE`
  
And then...

To re-export the Discussions.json file, run:
```sh
node ./scripts/discussionsQuery.js
```

## Translate Json export to markdown

From the root package directory, run:

```sh
cat Discussions.json | ruby scripts/discussionJsonToMd.rb > Discussions.md
```
