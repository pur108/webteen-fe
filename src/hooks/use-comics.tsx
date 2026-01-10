"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  Comic,
  Chapter,
  Tag,
  CreateComicInput,
  CreateChapterInput,
} from "@/schemas/comic";

export function useComics(tags?: string) {
  return useQuery({
    queryKey: ["comics", tags],
    queryFn: () => api.get<Comic[]>(`/comics${tags ? `?tags=${tags}` : ""}`),
  });
}

export function useComic(id: string) {
  return useQuery({
    queryKey: ["comic", id],
    queryFn: () => api.get<Comic>(`/comics/${id}`),
    enabled: !!id,
  });
}

export function useChapter(id: string) {
  return useQuery({
    queryKey: ["chapter", id],
    queryFn: () => api.get<Chapter>(`/chapters/${id}`),
    enabled: !!id,
  });
}

export function useTags(type?: string) {
  return useQuery({
    queryKey: ["tags", type],
    queryFn: () => api.get<Tag[]>(`/tags${type ? `?type=${type}` : ""}`),
  });
}

export function useMyComics() {
  return useQuery({
    queryKey: ["my-comics"],
    queryFn: () => api.get<Comic[]>("/creator/comics"),
  });
}

export function useCreateComic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComicInput) =>
      api.post<Comic>("/creator/comics", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-comics"] });
    },
  });
}

export function useUpdateComic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateComicInput>;
    }) => api.put<Comic>(`/creator/comics/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["comic", id] });
      queryClient.invalidateQueries({ queryKey: ["my-comics"] });
    },
  });
}

export function useDeleteComic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/creator/comics/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-comics"] });
    },
  });
}

export function useCreateChapter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      comicId,
      data,
    }: {
      comicId: string;
      data: CreateChapterInput;
    }) => api.post<Chapter>(`/creator/comics/${comicId}/chapters`, data),
    onSuccess: (_, { comicId }) => {
      queryClient.invalidateQueries({ queryKey: ["comic", comicId] });
    },
  });
}

export function useRequestPublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      api.post(`/creator/comics/${id}/publish-request`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-comics"] });
    },
  });
}

export function usePendingComics() {
  return useQuery({
    queryKey: ["pending-comics"],
    queryFn: () => api.get<Comic[]>("/admin/comics"),
  });
}

export function useApproveComic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.post(`/admin/comics/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-comics"] });
      queryClient.invalidateQueries({ queryKey: ["comics"] });
    },
  });
}

export function useRejectComic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      api.post(`/admin/comics/${id}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-comics"] });
    },
  });
}
