"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchAuthSops } from "@/hooks/sops/actions";

export default function HRDashboard() {
  const { data: sopsData, isLoading } = useFetchAuthSops();

  const { activeSops, inactiveSops } = useMemo(() => {
    if (!sopsData) return { activeSops: 0, inactiveSops: 0 };
    return {
      activeSops: sopsData.filter((sop) => sop.is_active).length,
      inactiveSops: sopsData.filter((sop) => !sop.is_active).length,
    };
  }, [sopsData]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#004d40]">HR Dashboard</h1>
          <p className="text-zinc-500">Tamarind Elimu System Management</p>
        </div>
        <Badge className="bg-emerald-100 text-[#004d40] border-emerald-200 hover:bg-emerald-100 px-4 py-1.5 rounded-full">
          HR Administrator
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#004d40]">24</div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Active Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#004d40]">156</div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">SOP Library Status</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3 mt-1">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>
            ) : (
              <div>
                <div className="text-4xl font-bold text-[#004d40]">
                  {activeSops} <span className="text-xl font-medium text-emerald-600/60">Active</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 px-2 py-0.5 text-xs font-semibold">
                    {inactiveSops} Inactive
                  </Badge>
                  <span className="text-xs text-zinc-400 font-medium">hidden from portal</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#004d40] mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Welcome, HR Manager</h2>
        <p className="text-zinc-600 max-w-md mx-auto">
          This is your central hub for managing Tamarind Group's learning courses, SOPs, and employee certifications.
        </p>
      </div>
    </div>
  );
}