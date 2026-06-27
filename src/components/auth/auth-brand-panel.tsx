import { Sparkles } from 'lucide-react';

interface AuthBrandPanelProps {
  title: string;
  description: string;
}

export function AuthBrandPanel({ title, description }: AuthBrandPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 rounded-2xl bg-sky-600 text-white min-h-[480px]">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">HobbyFind</span>
        </div>
        <h2 className="text-2xl font-bold leading-snug mb-3">{title}</h2>
        <p className="text-sky-100 leading-relaxed">{description}</p>
      </div>
      <p className="text-sm text-sky-200 italic">
        &ldquo;이 취미, 찐이다&rdquo; — 오늘의 PICK을 만나보세요
      </p>
    </div>
  );
}
