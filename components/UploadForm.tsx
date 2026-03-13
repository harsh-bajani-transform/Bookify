"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Image as ImageIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingOverlay from "./LoadingOverlay";
import FileUploader from "./FileUploader";
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES } from "@/lib/constants";
import VoiceSelector from "./VoiceSelector";
import { UploadSchema } from "@/lib/zos";
import { BookUploadFormValues } from "@/types";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      persona: "",
      pdfFile: undefined,
      coverImage: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof UploadSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Form Submitted:", values);
    setIsSubmitting(false);
  };

  if (!isMounted) return null;

  return (
    <div className="new-book-wrapper relative w-full max-w-2xl mx-auto">
      {isSubmitting && <LoadingOverlay />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* PDF Upload */}
          <FileUploader
            control={form.control}
            name="pdfFile"
            label="Book PDF File"
            acceptTypes={ACCEPTED_PDF_TYPES}
            icon={Upload}
            placeholder="Click to upload PDF"
            hint="PDF file (max 50MB)"
            disabled={isSubmitting}
          />

          {/* Cover Image Upload */}
          <FileUploader
            control={form.control}
            name="coverImage"
            label="Cover Image (Optional)"
            acceptTypes={ACCEPTED_IMAGE_TYPES}
            icon={ImageIcon}
            placeholder="Click to upload cover image"
            hint="Leave empty to auto-generate from PDF"
            disabled={isSubmitting}
          />

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label block text-gray-700 font-semibold mb-2">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Rich Dad Poor Dad"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label block text-gray-700 font-semibold mb-2">
                  Author Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: Robert Kiyosaki"
                    className="form-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="persona"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">
                  Choose Assistant Voice
                </FormLabel>
                <FormControl>
                  <VoiceSelector
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="form-btn w-full py-4 rounded-lg flex justify-center items-center text-white text-lg font-serif transition-colors hover:bg-opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#663820" }}
          >
            Begin Synthesis
          </button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
