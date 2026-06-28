'use client';

import { Suspense, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Topbar } from '@/components/layout/topbar';
import { AuthBrandPanel } from '@/components/auth/auth-brand-panel';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/** UC-06 AF-06 — credential failure copy */
function getAuthErrorMessage(message: string): string {
  if (message.includes('등록되지 않은 이메일')) {
    return message;
  }
  if (
    message.includes('비밀번호') ||
    message === 'CredentialsSignin'
  ) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }
  return message;
}

function getSafeCallbackUrl(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/';
  return raw;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-14 bg-neutral-light" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const callbackUrl = getSafeCallbackUrl(searchParams.get('callbackUrl'));
  const fromBookmark = searchParams.get('from') === 'bookmark';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = form.watch('email');
  const passwordValue = form.watch('password');

  useEffect(() => {
    if (authError) {
      setAuthError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue, passwordValue]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const checkResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!checkResponse.ok) {
        const errorData = await checkResponse.json().catch(() => ({}));
        const message =
          typeof errorData.message === 'string'
            ? errorData.message
            : '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
        setAuthError(getAuthErrorMessage(message));
        return;
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError(getAuthErrorMessage(result.error));
        return;
      }

      if (result?.ok) {
        toast({
          title: '로그인 성공',
          description: '환영합니다!',
        });
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      setAuthError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } catch {
      setAuthError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-14">
      <Topbar />
      <main className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          <AuthBrandPanel
            title="다시 오신 걸 환영해요"
            description="로그인하면 북마크한 취미와 취향 통계를 이어서 볼 수 있어요. 오늘의 추천도 놓치지 마세요."
          />
          <Card className="rounded-2xl summer-panel shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-ink">로그인</CardTitle>
              <CardDescription>HobbyFind 계정으로 로그인</CardDescription>
            </CardHeader>
            <CardContent>
              {fromBookmark && (
                <p className="text-sm text-ink-muted bg-neutral-light border border-border-gray rounded-xl px-4 py-3 mb-4">
                  북마크하려면 로그인해주세요. 로그인 후 이전 페이지로 돌아갑니다.
                </p>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4 z-10" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@email.com"
                              className={cn(
                                'pl-10 rounded-xl',
                                (fieldState.error || authError) && 'border-error-red',
                              )}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-error-red text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4 z-10" />
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className={cn(
                                'pl-10 pr-10 rounded-xl',
                                (fieldState.error || authError) && 'border-error-red',
                              )}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-ink-muted" />
                              ) : (
                                <Eye className="h-4 w-4 text-ink-muted" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-error-red text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  {authError && (
                    <p className="text-error-red text-sm mt-1" role="alert">
                      {authError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-brand-primary hover:bg-[#E31C5F] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? '로그인 중...' : '로그인'}
                  </Button>
                </form>
              </Form>
              <p className="mt-6 text-center text-sm text-ink-muted">
                계정이 없나요?{' '}
                <Link href="/signup" className="text-brand-primary font-semibold hover:underline">
                  회원가입
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
