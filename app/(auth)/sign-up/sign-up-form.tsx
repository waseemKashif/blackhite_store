"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // create a mini component
  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className=" w-full" variant="default">
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      e.target.previousElementSibling?.classList.add("moveLabelAbove");   
    }else {
      e.target.previousElementSibling?.classList.remove("moveLabelAbove"); 
    }
  };
  return (
    <form action={action} id="signUpForm">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className=" space-y-4">
        <div className="relative">
          <Label
            htmlFor="name"
            className={`label absolute transition-all duration-200`}
          >
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            
            autoComplete="name"
            placeholder=""
            onChange={handleInputChange}
            defaultValue={signUpDefaultValues.name}
            className="focus-visible:ring-0 focus-visible:ring-neutral-50 focus:ring-0 focus-visible:outline-none"
          />
        </div>

        <div className=" relative">
          <Label htmlFor="email" className="label">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
          
            autoComplete="email"
            onChange={handleInputChange}
            defaultValue={signUpDefaultValues.email}
            className=" focus-visible:ring-0 focus-visible:ring-neutral-50  focus:ring-0 focus-visible:outline-none"
          />
        </div>
        <div className=" relative">
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="password"
            onChange={handleInputChange}
            defaultValue={signUpDefaultValues.password}
            className=" focus-visible:ring-0 focus-visible:ring-neutral-50  focus:ring-0 focus-visible:outline-none"
          />
        </div>
        <div className=" relative">
          <Label htmlFor="confirmPassword" className="label">
            Confirm Password
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            autoComplete="confirmPassword"
            onChange={handleInputChange}
            defaultValue={signUpDefaultValues.confirmPassword}
            className=" focus-visible:ring-0 focus-visible:ring-neutral-50  focus:ring-0 focus-visible:outline-none"
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className=" text-center text-destructive"> {data.message}</div>
        )}
        <div className=" text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            target="_self"
            className=" link"
            title="create an account"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
