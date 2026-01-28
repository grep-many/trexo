import { error } from "console";
import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");

  const headers = options.headers as Record<string, string>;
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "Content-Type": "applicatoin/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>,
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error!",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;

    const messages = errors?.map((err) => err?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }

  return null;
};

const fetchWrapper = async (url: string, options: RequestInit) => {
  const res = await customFetch(url, options);

  const response = res.clone();
  const body = await response.json();
  const error = getGraphQLErrors(body);

  if (error) throw error;

  return response;
};

export default fetchWrapper;
