import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  priority: Priority;
  status: Status;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Scalars['Boolean']['output'];
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTaskInput;
};

export enum Priority {
  High = 'high',
  Low = 'low',
  Medium = 'medium'
}

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks: Array<Task>;
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};

export enum Status {
  Done = 'done',
  InProgress = 'in_progress',
  Todo = 'todo'
}

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  priority: Priority;
  status: Status;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Priority>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: number, title: string, description?: string | null, status: Status, priority: Priority, createdAt: string, updatedAt: string } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: number, title: string, description?: string | null, status: Status, priority: Priority, createdAt: string, updatedAt: string } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: number, title: string, description?: string | null, status: Status, priority: Priority, createdAt: string, updatedAt: string }> };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: number, title: string, description?: string | null, status: Status, priority: Priority, createdAt: string, updatedAt: string } | null };


export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: Int!, $input: UpdateTaskInput!) {
  updateTask(id: $id, input: $input) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: Int!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetTasksDocument = gql`
    query GetTasks {
  tasks {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
// @ts-ignore
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetTasksQuery, GetTasksQueryVariables>;
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetTasksQuery | undefined, GetTasksQueryVariables>;
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskDocument = gql`
    query GetTask($id: Int!) {
  task(id: $id) {
    id
    title
    description
    status
    priority
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables> & ({ variables: GetTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
// @ts-ignore
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>): Apollo.UseSuspenseQueryResult<GetTaskQuery, GetTaskQueryVariables>;
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>): Apollo.UseSuspenseQueryResult<GetTaskQuery | undefined, GetTaskQueryVariables>;
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;