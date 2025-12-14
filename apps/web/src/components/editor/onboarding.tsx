"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const getStepTitle = () => {
    switch (step) {
      case 0:
        return "欢迎使用 OpenCut Beta！🎉";
      case 1:
        return "⚠️ 这是一个超早期测试版本！";
      case 2:
        return "🦋 祝测试愉快！";
      default:
        return "OpenCut 引导";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="space-y-3">
              <Title title="欢迎使用 OpenCut Beta！🎉" />
              <Description description="您是首批尝试 OpenCut 的用户之一 - 这是一个完全开源的 CapCut 替代品。" />
            </div>
            <NextButton onClick={handleNext}>下一步</NextButton>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div className="space-y-3">
              <Title title={getStepTitle()} />
              <Description description="OpenCut 刚刚在一个月前启动。要让这个编辑器变得出色，还有很多工作要做。" />
              <Description description="很多功能仍然缺失，比如导出功能。我们正在努力构建它们！" />
              <Description description="如果您想了解更多，请查看我们的[路线图](https://opencut.app/roadmap)" />
            </div>
            <NextButton onClick={handleNext}>下一步</NextButton>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="space-y-3">
              <Title title={getStepTitle()} />
              <Description description="加入我们的 [Discord](https://discord.gg/zmR9N35cjK)，与优秀的人们聊天并分享反馈，帮助 OpenCut 成为最好的编辑器。" />
            </div>
            <NextButton onClick={handleClose}>完成</NextButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] !outline-none pt-2">
        <DialogTitle>
          <span className="sr-only">{getStepTitle()}</span>
        </DialogTitle>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}

function Title({ title }: { title: string }) {
  return <h2 className="text-lg md:text-xl font-bold">{title}</h2>;
}

function Subtitle({ subtitle }: { subtitle: string }) {
  return <h3 className="text-lg font-medium">{subtitle}</h3>;
}

function Description({ description }: { description: string }) {
  return (
    <div className="text-muted-foreground">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-0">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/80 underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
}

function NextButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button onClick={onClick} variant="default" className="w-full">
      {children}
      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
}
