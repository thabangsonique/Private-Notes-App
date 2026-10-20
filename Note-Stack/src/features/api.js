import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/config/supabase";

// Frontend should call backend HTTP endpoints via `fetch`/RTK Query only.

export const api = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_BASE_URL || '',
    prepareHeaders: async (headers) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        headers.set("Authorization", `Bearer ${session.access_token}`);
      }

      return headers;
    },
  }),
  reducerPath: "api",

  tagTypes: ["Notes", "Tasks"],
  endpoints: (build) => ({
    //NOTES ENDPOINTS
    getNotes: build.query({
      query: () => "/api/notes",
      providesTags: ["Notes"],
    }),

    createNote: build.mutation({
      query: (note) => ({
        url: "/api/notes",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Notes"],
    }),

    updateNotes: build.mutation({
      // `note` should include its `id` property
      query: (note) => ({
        url: `/api/notes/${note.id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: ["Notes"],
    }),

    deleteNote: build.mutation({
      // expect an `id` string/number as the argument
      query: (id) => ({
        url: `/api/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),

    //TASKS ENDPOINTS
    getTasks: build.query({
      query: () => "/api/tasks",
      providesTags: ["Tasks"],
    }),

    createTask: build.mutation({
      query: (task) => ({
        url: "/api/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation({
      query: ({ status, taskId }) => ({
        url: `/api/tasks/status/${taskId}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Tasks"],
    }),

    deleteTask: build.mutation({
      // expect an `id` string/number as the argument
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNotesMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = api;
