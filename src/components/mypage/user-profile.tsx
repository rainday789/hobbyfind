'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sparkles } from 'lucide-react';

interface UserProfileProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  bookmarkCount?: number;
}

export function UserProfile({ user, bookmarkCount = 0 }: UserProfileProps) {
  const initials = (user?.name || user?.email || 'U')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="rounded-2xl summer-panel overflow-hidden">
      <div className="h-2 bg-sky-600" />
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar className="w-16 h-16 ring-4 ring-sky-100">
            <AvatarFallback className="bg-sky-600 text-white text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-xl font-bold text-ink">{user?.name || '회원'}</h2>
            </div>
            <p className="text-ink-muted text-sm">{user?.email}</p>
          </div>
          <div className="text-center sm:text-right px-4 py-3 rounded-xl bg-sky-50 border border-sky-200">
            <p className="text-2xl font-bold text-sky-700">{bookmarkCount}</p>
            <p className="text-xs text-ink-muted">저장한 취미</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
