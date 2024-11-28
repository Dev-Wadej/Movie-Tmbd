import { UseBaseQueryOptions, useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { createApiRequest } from "./createApiRequest";

const keysToRemoveFromQueryKey = ["sort_ascending"];

export interface definitionOptions {
  key: ((arg: string) => string[]) | string[];
  url: string;
  options?: Partial<UseBaseQueryOptions>;
}

export interface usageOptions<TData> {
  pathParams?: Record<string, string>;
  queryParams?: Record<string, string>;
  enabled?: boolean;
  onSuccess?: (data: TData, ...args: Record<string, unknown>[]) => void;
}

export const createQuery = <TData, TError = unknown>(
  definitionOptions: definitionOptions
) => {
  const useQueryFn = (usageOptions?: usageOptions<TData>) => {
    if (!usageOptions) usageOptions = {};

    const { url, key } = definitionOptions;
    const { pathParams = {}, queryParams = {}, ...rest } = usageOptions;

    const mergeOptions = {
      ...definitionOptions.options,
      ...rest // usage options
    };

    // Interpolate pathParams into the URL
    const interpolatedUrl = Object.keys(pathParams).reduce(
      (acc, paramKey) => acc.replace(`:${paramKey}`, pathParams[paramKey]),
      url
    );

    const params = queryParams ? qs.stringify(queryParams) : "";
    const transformedFilters = transformFiltersToKey(queryParams);
    const keyParams = transformedFilters
      ? qs.stringify(transformedFilters)
      : "";

    // Add pathParams to queryKey
    const queryKey =
      typeof key === "function" ? key(keyParams) : [...key, pathParams];

    return useQuery<unknown, TError, TData, any>({
      queryKey,
      queryFn: () =>
        createApiRequest<TData>({
          url: `${interpolatedUrl}${params ? `?${params}` : ""}`,
          queryParams: params,
          method: "GET"
        }),
      ...mergeOptions
    });
  };

  return useQueryFn;
};

const transformFiltersToKey = (filters: Record<string, string>) => {
  keysToRemoveFromQueryKey.forEach((key) => {
    delete filters[key];
  });
  return filters;
};
