import React from 'react'

import {
  useQuery,
  gql,
  // useSubscription
} from "@apollo/client";


const WOSS_GND_QUERY = gql`
query WossGNDProjectIssues {
  project(fullPath: "woss_io/gitlab-notification-dashboard") {
    issues {
      edges {
        node {
          id
          iid
          discussions{
            edges {
              node {
                id
                notes {
                  edges {
                    node {
                      id
                      body
                      author {
                        id
                        name
                      }
                      resolved
                      system
                      resolved
                    }
                  }
                }
                id
                replyId
              }
            }
          }
        }
      }
    }
  }
}
`


// issuableAssigneesUpdated(issuableId: IssuableID!): Issuable
export default function ProjectIssues() {
  const { loading, error, data } = useQuery(WOSS_GND_QUERY, {
    pollInterval: 60000,
  });
  if (loading) return <p>Loading...</p>;
  if (error) {

    console.error(error)
  }
  return (
    <div>
      Code should be here:
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <DashboardSub /> */}
    </div>
  )
}

// const COMMENTS_SUBSCRIPTION = gql`
//   subscription issuableAssigneesUpdated($issuableId: IssuableID!) {
//   issuableAssigneesUpdated(issuableId: $issuableId) {
//     ... on Issue {
//       assignees {
//         nodes {
//           status {
//             availability
//           }
//         }
//       }
//     }
//   }
// }
// `;
// function DashboardSub() {
//   const { data, loading, error } = useSubscription(
//     COMMENTS_SUBSCRIPTION,
//     { variables: { issuableId: "gid://gitlab/Issue/92707896" } }
//   );
//   if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

//   console.log(loading, data)
//   return (
//     <div>
//       here is subscription
//     </div>
//   )
// }
