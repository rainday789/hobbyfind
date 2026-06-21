'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { categoryThemes, type HobbyCategory } from '@/lib/category-theme';
import { cn } from '@/lib/utils';

const navCategories: { id: HobbyCategory; href: string }[] = [
  { id: 'sports', href: '/category/sports' },
  { id: 'intelligence', href: '/category/intelligence' },
  { id: 'art', href: '/category/art' },
];

export function Topbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast({ title: '로그아웃', description: '다음에 또 만나요!' });
      router.push('/');
      router.refresh();
    } catch {
      toast({ title: '로그아웃 실패', variant: 'destructive' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <span className="text-lg font-bold text-ink tracking-tight">
            HobbyFind
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              pathname === '/'
                ? 'text-brand-primary bg-brand-purple-light'
                : 'text-ink-muted hover:text-ink hover:bg-surface'
            )}
          >
            홈
          </Link>
          {navCategories.map(({ id, href }) => (
            <Link
              key={id}
              href={href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-brand-primary bg-brand-purple-light'
                  : 'text-ink-muted hover:text-ink hover:bg-surface'
              )}
            >
              {categoryThemes[id].label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          {status === 'loading' ? (
            <div className="w-20 h-8 bg-line rounded-lg animate-pulse" />
          ) : session ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="rounded-lg text-ink-muted hover:text-brand-primary"
              >
                <Link href="/mypage">
                  <User className="w-4 h-4 mr-1" />
                  마이페이지
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="rounded-lg text-ink-muted"
              >
                <LogOut className="w-4 h-4 mr-1" />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-lg">
                <Link href="/login">로그인</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white"
              >
                <Link href="/signup">회원가입</Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem asChild>
                <Link href="/">홈</Link>
              </DropdownMenuItem>
              {navCategories.map(({ id, href }) => (
                <DropdownMenuItem key={id} asChild>
                  <Link href={href}>{categoryThemes[id].label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/mypage">마이페이지</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    로그아웃
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">로그인</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">회원가입</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
