"use client";

import * as React from "react";
import { BloodPressureForm } from "@/components/blood-pressure-form";
import { BloodPressureTable } from "@/components/blood-pressure-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useBloodPressureStore } from "@/hooks/use-blood-pressure-store";
import { useTranslations } from "@/hooks/use-translations";
import { exportToCSV } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { records } = useBloodPressureStore();
  const t = useTranslations();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = React.useState(false);

   const handleExport = () => {
    if (records.length === 0) {
      toast({
        title: t.exportError,
        description: t.noDataToExport,
        variant: "destructive",
      });
      return;
    }
    setIsExporting(true);
    try {
      exportToCSV(records);
      toast({
        title: t.exportSuccess,
      });
    } catch (error) {
       console.error("Export failed:", error);
      toast({
        title: t.exportError,
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-container">
      <header className="page-header">
        <div>
            <h1 className="header-title">{t.appName}</h1>
            <p className="text-muted-foreground">{t.tagline}</p>
        </div>
        <div className="header-actions">
           <Button onClick={handleExport} disabled={isExporting || records.length === 0} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? t.exporting : t.exportCSVButton}
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="main-content">
        <section className="form-section">
          <BloodPressureForm />
        </section>
        <section className="table-section">
          <BloodPressureTable />
        </section>
      </main>

      <footer className="footer">
        <p>{t.designedBy}</p>
      </footer>
    </div>
  );
}
