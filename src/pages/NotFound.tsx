
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-2 text-primary">404</h1>
        <h2 className="text-2xl font-bold mb-4">
          {t.notFound.title}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t.notFound.description}
        </p>
        <Button asChild className="btn-primary">
          <Link to="/">{t.notFound.returnHome}</Link>
        </Button>
      </div>
    </div>
  );
}
