const { gql, GraphQLClient } = require("graphql-request");
const fs = require("fs");
const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `bearer ${process.env.READONLY_GH_TOKEN}`,
  },
});

const query = gql`
  query ALL_DISCUSSIONS($endCursor: String) {
    repository(owner: "aws-amplify", name: "amplify-js") {
      discussions(first: 100, after: $endCursor) {
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            author {
              login
            }
            title
            body
            upvoteCount
            comments(first: 100) {
              edges {
                node {
                  author {
                    login
                  }
                  body
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function getData() {
  let pageCount = 0;
  let discussions = { data: [] };
  let hasNextPageState = true;
  let nextPageCursor = null;

  while (hasNextPageState) {
    pageCount++;
    const results = await graphQLClient.request(query, {
      endCursor: nextPageCursor,
    });

    const {
      edges,
      pageInfo: { hasNextPage, endCursor },
    } = results.repository.discussions;

    console.log(
      `Getting 100 records from page: ${pageCount} - Cursor: ${endCursor}`
    );

    discussions.data = [...discussions.data, ...edges];

    nextPageCursor = endCursor;

    hasNextPageState = hasNextPage;
  }

  console.log(discussions.data.length);

  fs.writeFile("Discussions.json", JSON.stringify(discussions), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

getData();
