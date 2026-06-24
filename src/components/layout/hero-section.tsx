'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { categoryThemes } from '@/lib/category-theme';
import { getHeroCopy } from '@/lib/recommendation-copy';

export function HeroSection() {
  const { data: session, status } = useSession();
  const copy = getHeroCopy(!!session, session?.user?.name);

  return (
    <section className="relative overflow-hidden summer-section">
      <div className="container mx-auto px-4 py-10 md:py-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="hero-badge mb-4">
            {copy.badge}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight mb-4 whitespace-pre-line">
            {copy.headline}
          </h1>
          <p className="text-ink-muted text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
            {copy.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8"
            >
              <Link href="#recommendations" className="flex items-center gap-2">
                추천 보러가기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            {status !== 'loading' && !session && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-sky-600 bg-white text-sky-700 hover:bg-sky-50"
              >
                <Link href="/signup">회원가입하고 찜하기</Link>
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {(Object.keys(categoryThemes) as Array<keyof typeof categoryThemes>).map(
            (key) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${categoryThemes[key].chip} hover:scale-105`}
              >
                {categoryThemes[key].emoji} {categoryThemes[key].label}
              </Link>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
