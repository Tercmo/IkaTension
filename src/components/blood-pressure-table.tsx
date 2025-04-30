"use client";

import * as React from "react";
import { format } from 'date-fns';
import { enUS, es } from 'date-fns/locale';
import { Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBloodPressureStore } from "@/hooks/use-blood-pressure-store";
import { useTranslations } from "@/hooks/use-translations";
import type { BloodPressureRecord } from "@/types";
import { useParams } from 'next/navigation';


export function BloodPressureTable() {
  const { records, deleteRecord } = useBloodPressureStore();
  const t = useTranslations();
   const params = useParams();
   const lang = typeof params.lang === 'string' ? params.lang : 'en';
   const locale = lang === 'es' ? es : enUS;


  const handleDelete = (id: string) => {
    deleteRecord(id);
    // Optional: Add toast notification for deletion
  };

  return (
     <Card>
        <CardHeader>
            <CardTitle>{t.bloodPressureHistory}</CardTitle>
        </CardHeader>
         <CardContent>
             <ScrollArea className="h-[400px] w-full rounded-md border"> {/* Adjust height as needed */}
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>{t.dateHeader}</TableHead>
                    <TableHead>{t.timeHeader}</TableHead>
                    <TableHead className="text-right">{t.systolicHeader}</TableHead>
                    <TableHead className="text-right">{t.diastolicHeader}</TableHead>
                    <TableHead className="text-right">{t.pulseHeader}</TableHead>
                    <TableHead className="text-right">{t.actionsHeader}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                         {t.noRecords}
                        </TableCell>
                    </TableRow>
                    ) : (
                    records.map((record: BloodPressureRecord) => (
                    <TableRow key={record.id}>
                        <TableCell>{format(new Date(record.timestamp), 'PPP', { locale })}</TableCell>
                        <TableCell>{format(new Date(record.timestamp), 'p', { locale })}</TableCell>
                        <TableCell className="text-right">{record.systolic}</TableCell>
                        <TableCell className="text-right">{record.diastolic}</TableCell>
                        <TableCell className="text-right">{record.pulse ?? '--'}</TableCell>
                        <TableCell className="text-right">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" aria-label={t.deleteButton}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>{t.confirmDeleteTitle}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t.confirmDeleteMessage}
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>{t.cancelButton}</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(record.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                >
                                    {t.confirmButton}
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                    </TableRow>
                    ))
                    )}
                </TableBody>
                </Table>
             </ScrollArea>
         </CardContent>
    </Card>
  );
}
