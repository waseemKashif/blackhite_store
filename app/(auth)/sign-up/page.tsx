import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth_copy_lightweight";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";
export const metadata: Metadata = {
  title: "Sign Up",
};
const SignUpPage = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();
  if (session) {
    console.log("you are logged In..");
    return redirect(callbackUrl || "/");
  }
  return (
    <div className=" w-full max-w-md mx-auto">
      <Card>
        <CardHeader className=" space-y-4">
          <Link href="/" title="Home page" className=" flex-center">
            <Image
              src="/images/ah_logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className="  text-center">Create Account</CardTitle>
          <CardDescription className=" text-center">
            Enter Your Information Below To Sign Up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
