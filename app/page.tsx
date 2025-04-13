import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export default function Home() {
  return (
    <div className="p-10">
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton>
            <Button variant={"default"} size={"default"} asChild>
              <span className="text-sm cursor-pointer">Login</span>
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant={"secondary"} size={"default"} asChild>
              <span className="text-sm cursor-pointer">Sign Up</span>
              </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1>Hello !!!</h1>
      <Button variant={"outline"}>Click me</Button>
    </div>
  );
}
