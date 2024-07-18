"use client";

import useBookModal from "@/hooks/use-book-modal";
import Modal from "./modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReservationSchema } from "@/schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

type BookingSchemaValues = z.infer<typeof ReservationSchema>;

const BookModal = () => {
  const bookModal = useBookModal();

  const form = useForm<BookingSchemaValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      name: "",
      date: undefined,
      duration: "",
      type: "",
      medium: "",
    },
  });

  const onSubmit = async (values: BookingSchemaValues) => {
    console.log(values);
  };

  const bodyContent = (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
                      {...field}
                      placeholder="Meeting Name"
                      className="focus-visible:ring-primary-500 py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );

  return (
    <Modal
      isOpen={bookModal.isOpen}
      title="Book Boardroom"
      onClose={bookModal.onClose}
      body={bodyContent}
    />
  );
};

export default BookModal;
