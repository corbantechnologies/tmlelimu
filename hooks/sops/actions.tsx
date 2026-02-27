"use client";

import { getSops, getSop, createSops, updateSops, deleteSops, getAuthSop, getAuthSops } from "@/services/sops";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";

interface CreateSopParams {
  formData: FormData;
  headers: { headers: { Authorization: string } };
}

interface UpdateSopParams {
  reference: string;
  formData: FormData;
  headers: { headers: { Authorization: string } };
}

interface DeleteSopParams {
  reference: string;
  headers: { headers: { Authorization: string } };
}

export function useFetchSops() {
  return useQuery({
    queryKey: ["sops"],
    queryFn: () => getSops(),
  });
}

export function useFetchSop(reference: string) {
  return useQuery({
    queryKey: ["sop", reference],
    queryFn: () => getSop(reference),
    enabled: !!reference,
  });
}

export function useCreateSop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ formData, headers }: CreateSopParams) => createSops(formData, headers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sops"] });
    },
  });
}

export function useUpdateSop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reference, formData, headers }: UpdateSopParams) => updateSops(reference, formData, headers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sops"] });
    },
  });
}

export function useDeleteSop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reference, headers }: DeleteSopParams) => deleteSops(reference, headers),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sops"] });
    },
  });
}


// Authenticated

export function useFetchAuthSops() {
  const headers = useAxiosAuth()
  return useQuery({
    queryKey: ["auth-sops"],
    queryFn: () => getAuthSops(headers),
    enabled: !!headers,
  });
}

export function useFetchAuthSop(reference: string) {
  const headers = useAxiosAuth()
  return useQuery({
    queryKey: ["auth-sop", reference],
    queryFn: () => getAuthSop(reference, headers),
    enabled: !!headers && !!reference,
  });
}