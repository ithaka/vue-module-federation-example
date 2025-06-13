<template>
  <div class="hello-world">
    <h1>Vue MFE 1</h1>

    <div>
      Vue version from package.json: <strong>{{ vueVersion }}</strong><br />
      Vue version from Vue: <strong>{{ version }}</strong>
    </div>

    <h2>Country</h2>
    {{ country }}
  </div>
</template>

<script setup>
import { computed, version } from "vue";
import packageJson from "../../package.json";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const vueVersion = packageJson.dependencies.vue;
const FetchCountry = gql`
  query Country($code: ID!) {
  country(code: $code) {
    emoji
    name
  }
}
`;

const {
  result: countryResult,
  error: countryError
} = useQuery(
  FetchCountry,
  {
    "code": "CH"
  },
  { notifyOnNetworkStatusChange: true, pollInterval: 10 * 60000 },
);
const country = computed(() => {
  return (
    !countryError.value && countryResult.value && countryResult.value
  );
});

</script>

<style scoped>
.hello-world {
  margin: 10px;
}
</style>
