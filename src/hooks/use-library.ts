import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
  LibraryFolder,
  LibraryFolderItem,
  CreateFolderInput,
} from "@/schemas/library";

export function useLibrary() {
  return useQuery({
    queryKey: ["library"],
    queryFn: () => api.get<LibraryFolderItem[]>("/library"),
  });
}

export function useLibraryFolders() {
  return useQuery({
    queryKey: ["library-folders"],
    queryFn: () => api.get<LibraryFolder[]>("/library/folders"),
  });
}

export function useLibraryFolder(id: string) {
  return useQuery({
    queryKey: ["library-folder", id],
    queryFn: () => api.get<LibraryFolder>(`/library/folders/${id}`),
    enabled: !!id,
  });
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFolderInput) =>
      api.post<LibraryFolder>("/library/folders", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-folders"] });
    },
  });
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/library/folders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library-folders"] });
    },
  });
}

export function useCheckInLibrary(comicId: string) {
  return useQuery({
    queryKey: ["library-check", comicId],
    queryFn: () =>
      api.get<{ in_library: boolean }>(`/library/check/${comicId}`),
    enabled: !!comicId,
  });
}

export function useAddToLibrary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comicId: string) =>
      api.post("/library/items", { comic_id: comicId }),
    onSuccess: (_, comicId) => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      queryClient.invalidateQueries({ queryKey: ["library-check", comicId] });
    },
  });
}

export function useRemoveFromLibrary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comicId: string) => api.delete(`/library/items/${comicId}`),
    onSuccess: (_, comicId) => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      queryClient.invalidateQueries({ queryKey: ["library-check", comicId] });
    },
  });
}
