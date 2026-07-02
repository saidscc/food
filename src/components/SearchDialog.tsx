import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useI18n } from "@/lib/i18n";
import { foods, formatPrice, getPrice } from "@/lib/foods";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return foods.slice(0, 6);
    return foods.filter((f) => {
      const hay = [
        f.name[lang],
        f.short[lang],
        f.description[lang],
        ...f.vitamins,
        ...f.minerals,
        ...f.categories,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, lang]);

  const go = (id: string) => {
    onOpenChange(false);
    setQuery("");
    navigate({ to: "/food/$foodId", params: { foodId: id } });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder={t("search.placeholder")}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>{t("search.noResults")}</CommandEmpty>
        <CommandGroup heading={query ? undefined : t("search.hint")}>
          {results.map((f) => (
            <CommandItem key={f.id} value={f.name[lang] + " " + f.id} onSelect={() => go(f.id)}>
              <img src={f.image} alt="" className="mr-3 h-10 w-10 rounded-lg object-cover" />
              <div className="flex flex-1 flex-col">
                <span className="font-medium">{f.name[lang]}</span>
                <span className="text-xs text-muted-foreground">{f.short[lang]}</span>
              </div>
              <span className="ml-2 text-sm font-semibold text-primary">{formatPrice(getPrice(f.id))}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      className="glass flex h-9 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
      aria-label={t("search.title")}
    >
      <Search className="h-4 w-4" />
      <span className="hidden lg:inline">{t("search.placeholder")}</span>
    </button>
  );
}
