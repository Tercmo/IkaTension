"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBloodPressureStore } from "@/hooks/use-blood-pressure-store";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";

const formSchema = z.object({
  systolic: z.coerce.number().int().positive().min(50, "Must be >= 50").max(300, "Must be <= 300"),
  diastolic: z.coerce.number().int().positive().min(30, "Must be >= 30").max(200, "Must be <= 200"),
  pulse: z.coerce.number().int().positive().min(30, "Must be >= 30").max(250, "Must be <= 250").optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export function BloodPressureForm() {
  const addRecord = useBloodPressureStore((state) => state.addRecord);
  const { toast } = useToast();
  const t = useTranslations();
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systolic: "",
      diastolic: "",
      pulse: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSaving(true);
    try {
      // Simulate async operation if needed
      // await new Promise(resolve => setTimeout(resolve, 500));
      const recordData = {
        systolic: values.systolic,
        diastolic: values.diastolic,
        // Only include pulse if it's a valid number
        ...(typeof values.pulse === 'number' && { pulse: values.pulse }),
      };
      addRecord(recordData);
      toast({
        title: t.recordSavedSuccess,
      });
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to save record:", error);
      toast({
        title: t.recordSavedError,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
        <CardHeader>
             <CardTitle>{t.saveRecordButton}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="systolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.systolicLabel}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t.systolicPlaceholder} {...field} aria-required="true" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diastolic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.diastolicLabel}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t.diastolicPlaceholder} {...field} aria-required="true" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pulse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.pulseLabel}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t.pulsePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type="submit" disabled={isSaving} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? t.savingRecord : t.saveRecordButton}
              </Button>
            </form>
          </Form>
      </CardContent>
    </Card>
  );
}
