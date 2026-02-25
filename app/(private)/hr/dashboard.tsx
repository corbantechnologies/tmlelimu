"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HRDashboard() {
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
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Pending SOP Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-600">8</div>
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