"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CreateSopSchema } from "@/validation";
import { useCreateSop } from "@/hooks/sops/actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateSop({ onSuccess }: { onSuccess: () => void }) {
  const { data: session } = useSession();
  const { mutateAsync: createSop, isPending } = useCreateSop();
  const [fileError, setFileError] = useState("");

  const initialValues = {
    title: "",
    description: "",
    file: null,
  };

  const getHeaders = () => {
    // @ts-ignore
    const token = session?.user?.accessToken || "";
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      if (!values.file) {
        setFileError("A document file is required.");
        return;
      }
      setFileError("");

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("file", values.file);

      await createSop({ formData, headers: getHeaders() });
      toast.success("SOP created successfully");
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Failed to create SOP");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateSopSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-700">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Employee Code of Conduct"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className={
                errors.title && touched.title ? "border-red-500" : "border-zinc-300"
              }
            />
            {errors.title && touched.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-zinc-700">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief overview of the SOP..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              rows={4}
              className={`resize-none ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-zinc-300"
              }`}
            />
            {errors.description && touched.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-zinc-700">
              SOP Document (PDF or Word)
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                setFieldValue("file", file);
                setFileError("");
              }}
              className="border-zinc-300 text-zinc-600 file:text-[#004d40] file:bg-zinc-100 hover:file:bg-zinc-200"
            />
            {fileError && <p className="text-sm text-red-500">{fileError}</p>}
            {errors.file && touched.file && (
              <p className="text-sm text-red-500">{String(errors.file)}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-[#004d40] hover:bg-[#00332b] text-white py-2.5 shadow-md transition-all"
            >
              {isSubmitting || isPending ? "Uploading..." : "Upload SOP"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
