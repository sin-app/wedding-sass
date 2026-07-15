"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { setPublishStatus } from "@/app/dashboard/actions";

export function PublishToggle({
  id,
  published,
  className,
}: {
  id: string;
  published: boolean;
  className?: string;
}) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant={published ? "default" : "outline"}
      className={cn(className)}
      disabled={pending}
      onClick={() =>
        start(async () => {
          await setPublishStatus(id, !published);
          router.refresh();
        })
      }
    >
      {published ? <EyeOff className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
      {published ? "Sembunyikan" : "Terbitkan"}
    </Button>
  );
}
