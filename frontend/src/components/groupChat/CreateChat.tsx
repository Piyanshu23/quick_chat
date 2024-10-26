"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/groupChatValidation";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/apiAuthRoutes";
import { clearCache } from "@/actions/common";

const CreateChat = ({ user }: { user: CustomUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });
  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        CHAT_GROUP_URL,
        {
          ...payload,
          user_id: user.id,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (data?.message) {
        clearCache("dashboard");
        setLoading(false);
        setOpen(false);
        toast.success(data?.message);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) toast.error(error.message);
      else toast.error("Something went wrong, Please try again ");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Your New Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <input placeholder="Enter chat Title" {...register("title")} />
            <span className="text-red-500">{errors?.title?.message}</span>
          </div>
          <div className="mt-4">
            <input
              placeholder="Enter chat Passcode"
              type="password"
              {...register("passcode")}
            />
            <span className="text-red-500">{errors?.passcode?.message}</span>
          </div>
          <Button className="w-full" disabled={loading}>
            {loading ? "Processing...." : "Submit"}{" "}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
