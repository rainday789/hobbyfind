interface AuthBrandPanelProps {
  title: string;
  description: string;
}

export function AuthBrandPanel({ title, description }: AuthBrandPanelProps) {
  return (
    <div className="hidden lg:flex flex-col justify-between p-10 rounded-2xl bg-brand-primary text-white min-h-[480px]">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#E31C5F] flex items-center justify-center">
            <span className="text-lg font-bold">H</span>
          </div>
          <span className="text-xl font-bold">HobbyFind</span>
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
      <p className="text-sm text-white/60 italic">
        취미를 찾고, 저장하고, 나만의 취향을 발견하세요.
      </p>
    </div>
  );
}
