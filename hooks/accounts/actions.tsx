"use client";

import { getAccount } from "@/services/accounts";
import useUserId from "../authentication/useUserId";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../authentication/useAxiosAuth";

export function useFetchAccount() {
    const userId = useUserId();
    const token = useAxiosAuth();

    return useQuery({
        queryKey: ["account", userId],
        queryFn: () => getAccount(userId as string, token),
        enabled: !!userId,
    });
}