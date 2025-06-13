import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

const notificationsEndpoint = createHttpLink({ uri: "https://countries.trevorblades.com/graphql" });

export const notificationsClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: notificationsEndpoint,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
