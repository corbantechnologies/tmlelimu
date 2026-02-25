"use client";

import { getSops, getSop } from "@/services/sops";
import { useQuery } from "@tanstack/react-query";

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