'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // 구체적인 에러 메시지에 따라 다른 토스트 메시지 표시
        if (result.error.includes('등록되지 않은 이메일')) {
          toast({
            title: '회원가입이 필요합니다',
            description: '등록되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.',
            variant: 'destructive',
          });
        } else if (result.error.includes('비밀번호가 올바르지 않습니다')) {
          toast({
            title: '비밀번호 오류',
            description: '비밀번호가 올바르지 않습니다. 다시 확인해주세요.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: '로그인 실패',
            description: result.error,
            variant: 'destructive',
          });
        }
      } else if (result?.ok) {
        toast({
          title: '로그인 성공',
          description: '환영합니다!',
        });
        router.push('/');
        router.refresh();
      } else {
        const errorMsg = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
        toast({
          title: '로그인 실패',
          description: errorMsg,
          variant: 'destructive',
        });
      }
    } catch (error) {
      const errorMsg = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      toast({
        title: '오류 발생',
        description: errorMsg,
        variant: 'destructive',
      });
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
          <Card className="rounded-2xl border-line shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-ink">로그인</CardTitle>
              <CardDescription>HobbyFind 계정으로 로그인</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4 z-10" />
                            <Input {...field} type="email" placeholder="you@email.com" className="pl-10 rounded-xl" disabled={isLoading} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted w-4 h-4 z-10" />
                            <Input {...field} type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10 rounded-xl" disabled={isLoading} />
                            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                              {showPassword ? <EyeOff className="h-4 w-4 text-ink-muted" /> : <Eye className="h-4 w-4 text-ink-muted" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full rounded-xl bg-brand-primary hover:bg-brand-primary/90" disabled={isLoading}>
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
